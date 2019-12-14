import faker from 'faker';

import db from '~/models';

const makeGoal = (args) => (
  db.sequelize.models.Goal.create({
    name: faker.lorem.word(),
    color: faker.internet.color(),
    ...args,
  })
);

export default makeGoal;
