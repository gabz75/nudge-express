export default (sequelize, DataTypes) => {
  const MoodReport = sequelize.define('MoodReport', {
    score: DataTypes.INTEGER,
    date: DataTypes.DATE,
    doing: DataTypes.STRING,
    feelings: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  MoodReport.associate = function associate(models) {
    MoodReport.belongsTo(models.User);
  };
  return MoodReport;
};
