import faker from 'faker';

import db from '~/models';

export const makeUser = (args) => (
  db.sequelize.models.User.create({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'qweqweqwe',
    ...args,
  })
);

export default makeUser;
