export default (sequelize, DataTypes) => {
  const GoalValue = sequelize.define('GoalValue', {
    intValue: DataTypes.INTEGER,
    boolValue: DataTypes.BOOLEAN,
    stringValue: DataTypes.STRING,
    floatValue: DataTypes.FLOAT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  GoalValue.associate = function associate(models) {
    GoalValue.belongsTo(models.Goal);
    GoalValue.belongsTo(models.MoodReport);
  };
  return GoalValue;
};
