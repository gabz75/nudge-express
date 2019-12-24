export default (sequelize, DataTypes) => {
  const GoalValueInt = sequelize.define('GoalValueInt', {
    value: DataTypes.INTEGER,
    date: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  GoalValueInt.associate = function associate(models) {
    GoalValueInt.hasOne(models.GoalValue, {
      foreignKey: 'goalValueId',
      constraints: false,
      scope: {
        goalValue: 'GoalValueInt',
      },
    });
  };
  return GoalValueInt;
};
