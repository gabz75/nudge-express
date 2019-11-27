export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Nudge);
  };
  return User;
};
