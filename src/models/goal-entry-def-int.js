export default (sequelize, DataTypes) => {
  const GoalEntryDefInt = sequelize.define('GoalEntryDefInt', {
    unit: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  GoalEntryDefInt.associate = function associate(models) {
    GoalEntryDefInt.hasOne(models.Goal, {
      foreignKey: 'goalEntryDefId',
      constraints: false,
      scope: {
        goalEntryDef: 'goalEntryDefInt',
      },
    });
  };
  return GoalEntryDefInt;
};
