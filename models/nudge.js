export default (sequelize, DataTypes) => {
  const Nudge = sequelize.define('Nudge', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    archived: DataTypes.BOOLEAN,
    public: DataTypes.BOOLEAN
  }, {});
  Nudge.associate = function(models) {
    Nudge.belongsTo(models.User);
  };
  return Nudge;
};
