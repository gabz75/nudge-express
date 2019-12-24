export default (sequelize, DataTypes) => {
  const GoalValueBool = sequelize.define('GoalValueBool', {
    value: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  GoalValueBool.associate = function associate(models) {
    GoalValueBool.hasOne(models.GoalValue, {
      foreignKey: 'goalValueId',
      constraints: false,
      scope: {
        goalValue: 'GoalValueBool',
      },
    });
  };
  return GoalValueBool;
};
