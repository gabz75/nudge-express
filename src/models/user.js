import jsonwebtoken from 'jsonwebtoken';
import crypto from 'crypto';

import { ENV } from '~/config';

export const generateSalt = () => crypto.randomBytes(16).toString('base64');

export const encryptPassword = (plainText, salt) => (
  crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
);

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      allowNull: false,
    },
    name: DataTypes.STRING,
    encryptedPassword: DataTypes.STRING,
    encryptedPasswordSalt: DataTypes.STRING,
  }, {
    setterMethods: {
      password(value) {
        this.setDataValue('encryptedPassword', value);
      },
    },
  });

  // Class Methods

  User.associate = (models) => {
    User.hasMany(models.Goal);
  };

  // Hooks

  const setSaltAndPassword = (user) => {
    if (user.changed('encryptedPassword')) {
      user.encryptedPasswordSalt = generateSalt();
      user.encryptedPassword = encryptPassword(user.encryptedPassword, user.encryptedPasswordSalt);
    }
  };

  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

  // Instance Methods

  User.prototype.getJWT = function getJWT() {
    return jsonwebtoken.sign({ id: this.id }, ENV.JWT_ENCRYPTION, { expiresIn: ENV.JWT_EXPIRATION });
  };

  User.prototype.verifyPassword = function verifyPassword(password) {
    return encryptPassword(password, this.encryptedPasswordSalt) === this.encryptedPassword;
  };

  return User;
};
