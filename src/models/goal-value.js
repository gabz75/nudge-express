export default (sequelize, DataTypes) => {
  const GoalValue = sequelize.define('GoalValue', {
    goalValue: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  GoalValue.associate = function associate(models) {
    GoalValue.belongsTo(models.Goal);
    GoalValue.belongsTo(models.MoodReport);
    GoalValue.belongsTo(models.GoalValueBool, {
      foreignKey: 'goalValueId',
      constraints: false,
      as: 'goalValueBool',
    });
    GoalValue.belongsTo(models.GoalValueInt, {
      foreignKey: 'goalValueId',
      constraints: false,
      as: 'goalValueInt',
    });
  };
  return GoalValue;
};
