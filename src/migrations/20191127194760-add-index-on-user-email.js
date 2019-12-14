export default {
  up: (queryInterface /*  Sequelize */) => (
    queryInterface.addIndex('Users', ['email'], { unique: true })
  ),
  down: (queryInterface /* , Sequelize */) => queryInterface.removeIndex('Users', ['email']),
};
