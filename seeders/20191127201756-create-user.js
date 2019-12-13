import { generateSalt, encryptPassword } from '../models/user';

export default {
  up: (queryInterface /* , Sequelize */) => {
    const encryptedPasswordSalt = generateSalt();
    const encryptedPassword = encryptPassword('qweqweqwe', encryptedPasswordSalt);

    return queryInterface.bulkInsert('Users', [{
      name: 'Gabe',
      email: 'gabe@gmail.com',
      encryptedPassword,
      encryptedPasswordSalt,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface /* , Sequelize */) => queryInterface.bulkDelete('Users', null, {}),
};
