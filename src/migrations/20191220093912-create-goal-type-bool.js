export default {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('GoalTypeBools', {
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

  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('GoalTypeBools'),
};
