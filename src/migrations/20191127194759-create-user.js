export default {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      encryptedPassword: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      encryptedPasswordSalt: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  ),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Users'),
};
