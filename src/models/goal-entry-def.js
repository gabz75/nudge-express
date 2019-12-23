export default (sequelize, DataTypes) => {
  const GoalEntryDef = sequelize.define('GoalEntryDef', {
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    friendlyName: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  return GoalEntryDef;
};
