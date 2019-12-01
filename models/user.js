import jsonwebtoken from 'jsonwebtoken';
import crypto from 'crypto';

import { ENV } from '../config';

const generateSalt = () => {
  return crypto.randomBytes(16).toString('base64')
};

const encryptPassword = (plainText, salt) =>{
  return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex');
}

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    encryptedPassword: DataTypes.STRING,
    encryptedPasswordSalt: DataTypes.STRING,
  }, {
    setterMethods: {
      password: function(value) {
        this.setDataValue('encryptedPassword', value);
      }
    }
  });

  /** Class Methods **/

  User.associate = function(models) {
    User.hasMany(models.Nudge);
  };

  /** Hooks **/

  const setSaltAndPassword = (user) => {
    if (user.changed('encryptedPassword')) {
        user.encryptedPasswordSalt = generateSalt();
        user.encryptedPassword = encryptPassword(user.encryptedPassword, user.encryptedPasswordSalt);
    }
  };

  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

  /** Instance Methods **/

  User.prototype.getJWT = function() {
    return jsonwebtoken.sign({ id: this.id }, ENV.JWT_ENCRYPTION, { expiresIn: ENV.JWT_EXPIRATION });
  }

  User.prototype.verifyPassword = function(password) {
    return encryptPassword(password, this.encryptedPasswordSalt) === this.encryptedPassword;
  }

  return User;
};
