export default (sequelize, DataTypes) => {
  const GoalEntryDef = sequelize.define('GoalEntryDef', {
    goalEntryDefMapping: DataTypes.STRING,
    description: DataTypes.STRING,
    friendlyName: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  return GoalEntryDef;
};
