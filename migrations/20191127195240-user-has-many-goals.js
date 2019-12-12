'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn('Goals', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      },
      allowNull: false,
    })
  ),

  down: (queryInterface /* , Sequelize */) => queryInterface.removeColumn('Goals', 'userId'),
};
