export default {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('GoalEntryDefInts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      unit: {
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
      goalEntryDefId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'GoalEntryDefs',
          },
          key: 'id',
        },
        allowNull: false,
      },
    })
  ),

  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('GoalEntryDefInts'),
};
