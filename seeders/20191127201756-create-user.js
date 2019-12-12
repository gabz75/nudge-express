export default {
  up: (queryInterface /* , Sequelize */) => (
    queryInterface.bulkInsert('Users', [{
      name: 'Gabe',
      email: 'gabe@gmail.com',
      password: 'qwerty',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {})
  ),

  down: (queryInterface /* , Sequelize */) => queryInterface.bulkDelete('Users', null, {}),
};
