export default (sequelize, DataTypes) => {
  const GoalEntryBool = sequelize.define('GoalEntryBool', {
    value: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  GoalEntryBool.associate = function associate(models) {
    GoalEntryBool.hasOne(models.GoalEntry, {
      foreignKey: 'goalEnterableId',
      constraints: false,
      scope: {
        goalEnterable: 'goalEntryBool',
      },
    });
  };
  return GoalEntryBool;
};
