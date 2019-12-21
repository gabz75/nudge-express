export default {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('GoalEntryDefBools', {
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
    })
  ),

  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('GoalEntryDefBools'),
};
