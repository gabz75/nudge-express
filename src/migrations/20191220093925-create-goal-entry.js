export default {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('GoalEntries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: { // @todo: determine if needed
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      goalId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Goals',
          },
          key: 'id',
        },
        allowNull: false,
      },
      moodReportId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'MoodReports',
          },
          key: 'id',
        },
        allowNull: false,
      },
      goalEnterable: {
        type: Sequelize.STRING,
      },
      goalEnterableId: {
        type: Sequelize.INTEGER,
      },
    })
  ),

  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('GoalEntries'),
};
