export default (sequelize, DataTypes) => {
  const GoalTypeBool = sequelize.define('GoalTypeBool', {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  GoalTypeBool.associate = function associate(models) {
    GoalTypeBool.belongsTo(models.GoalType);
    GoalTypeBool.hasOne(models.Goal, {
      foreignKey: 'goalTypeId',
      constraints: false,
      scope: {
        goalType: 'GoalTypeBool',
      },
    });
  };
  return GoalTypeBool;
};
