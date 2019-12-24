export default {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('GoalTypeInts', {
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
      goalTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'GoalTypes',
          },
          key: 'id',
        },
        allowNull: false,
      },
    })
  ),

  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('GoalTypeInts'),
};
