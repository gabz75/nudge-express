export default {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Goals', 'goalEntryDef', {
      type: Sequelize.STRING,
    }),
    queryInterface.addColumn('Goals', 'goalEntryDefId', {
      type: Sequelize.INTEGER,
    }),
  ]),

  down: (queryInterface /* , Sequelize */) => Promise.all([
    queryInterface.removeColumn('Goals', 'goalEntryDef'),
    queryInterface.removeColumn('Goals', 'goalEntryDefId'),
  ]),
};
