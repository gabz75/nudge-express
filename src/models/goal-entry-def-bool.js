export default (sequelize, DataTypes) => {
  const GoalEntryDefBool = sequelize.define('GoalEntryDefBool', {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  GoalEntryDefBool.associate = function associate(models) {
    GoalEntryDefBool.belongsTo(models.GoalEntryDef);
    GoalEntryDefBool.hasOne(models.Goal, {
      foreignKey: 'goalEntryDefId',
      constraints: false,
      scope: {
        goalEntryDef: 'goalEntryDefBool',
      },
    });
  };
  return GoalEntryDefBool;
};
