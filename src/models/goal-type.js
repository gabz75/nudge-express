export default (sequelize, DataTypes) => {
  const GoalType = sequelize.define('GoalType', {
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    friendlyName: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  return GoalType;
};
