export default (sequelize, DataTypes) => {
  const GoalEntry = sequelize.define('GoalEntry', {
    date: DataTypes.DATE,
    goalEnterable: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  GoalEntry.associate = function associate(models) {
    GoalEntry.belongsTo(models.User);
    GoalEntry.belongsTo(models.Goal);
    GoalEntry.belongsTo(models.MoodReport);
    GoalEntry.belongsTo(models.GoalEntryBool, {
      foreignKey: 'goalEnterableId',
      constraints: false,
      as: 'goalEntryBool',
      scope: {
        goalEnterable: 'goalEntryBool',
      },
    });
    GoalEntry.belongsTo(models.GoalEntryInt, {
      foreignKey: 'goalEnterableId',
      constraints: false,
      as: 'goalEntryInt',
      scope: {
        goalEnterable: 'goalEntryInt',
      },
    });
  };
  return GoalEntry;
};
