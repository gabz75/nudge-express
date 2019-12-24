import faker from 'faker';

import db from '~/models';

const makeGoalTypeInt = (args) => (
  db.sequelize.models.GoalTypeInt.create({
    unit: faker.random.word(),
    ...args,
  })
);

export default makeGoalTypeInt;
