export default {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('GoalEntryDefs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      goalEntryDefMapping: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      friendlyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
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

  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('GoalEntryDefs'),
};
