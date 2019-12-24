export default {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Goals', 'goalType', {
      type: Sequelize.STRING,
    }),
    queryInterface.addColumn('Goals', 'goalTypeId', {
      type: Sequelize.INTEGER,
    }),
  ]),

  down: (queryInterface /* , Sequelize */) => Promise.all([
    queryInterface.removeColumn('Goals', 'goalType'),
    queryInterface.removeColumn('Goals', 'goalTypeId'),
  ]),
};
