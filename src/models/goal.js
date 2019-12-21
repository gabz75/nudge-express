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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Goal.associate = function associate(models) {
    Goal.belongsTo(models.User);
    Goal.hasMany(models.GoalEntry);
    Goal.belongsTo(models.GoalEntryDefBool, {
      foreignKey: 'goalEntryDefId',
      constraints: false,
      as: 'goalEntryDefBool',
    });
    Goal.belongsTo(models.GoalEntryDefInt, {
      foreignKey: 'goalEntryDefId',
      constraints: false,
      as: 'goalEntryDefInt',
    });
  };
  return Goal;
};
