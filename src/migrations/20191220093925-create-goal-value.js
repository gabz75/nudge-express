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
      intValue: {
        type: Sequelize.INTEGER,
      },
      floatValue: {
        type: Sequelize.FLOAT,
      },
      boolValue: {
        type: Sequelize.BOOLEAN,
      },
      stringValue: {
        type: Sequelize.STRING,
      },
    })
  ),

  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('GoalValues'),
};
