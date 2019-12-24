export default {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('GoalValues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      goalValue: {
        type: Sequelize.STRING,
      },
      goalValueId: {
        type: Sequelize.INTEGER,
      },
    })
  ),

  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('GoalValues'),
};
