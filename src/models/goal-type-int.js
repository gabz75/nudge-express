export default (sequelize, DataTypes) => {
  const GoalTypeInt = sequelize.define('GoalTypeInt', {
    unit: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  GoalTypeInt.associate = function associate(models) {
    GoalTypeInt.belongsTo(models.GoalType);
    GoalTypeInt.hasOne(models.Goal, {
      foreignKey: 'goalTypeId',
      constraints: false,
      scope: {
        goalType: 'GoalTypeBool',
      },
    });
  };
  return GoalTypeInt;
};
