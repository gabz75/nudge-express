export default (sequelize, DataTypes) => {
  const Goal = sequelize.define('Goal', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});
  Goal.associate = function associate(models) {
    Goal.belongsTo(models.User);
  };
  return Goal;
};
