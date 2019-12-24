export default (sequelize, DataTypes) => {
  const Goal = sequelize.define('Goal', {
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    goalType: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Goal.associate = function associate(models) {
    Goal.belongsTo(models.User);
    Goal.hasMany(models.GoalEntry);
    Goal.belongsTo(models.GoalTypeBool, {
      foreignKey: 'goalTypeId',
      constraints: false,
      as: 'goalTypeBool',
    });
    Goal.belongsTo(models.GoalTypeInt, {
      foreignKey: 'goalTypeId',
      constraints: false,
      as: 'goalTypeInt',
    });
  };
  return Goal;
};
