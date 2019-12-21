export default (sequelize, DataTypes) => {
  const GoalEntryInt = sequelize.define('GoalEntryInt', {
    value: DataTypes.INTEGER,
    date: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  GoalEntryInt.associate = function associate(models) {
    GoalEntryInt.hasOne(models.GoalEntry, {
      foreignKey: 'goalEnterableId',
      constraints: false,
      scope: {
        goalEnterable: 'goalEntryInt',
      },
    });
  };
  return GoalEntryInt;
};
