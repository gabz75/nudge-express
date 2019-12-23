import faker from 'faker';

import db from '~/models';

const makeGoalEntryInt = (args) => (
  db.sequelize.models.GoalEntryInt.create({
    value: faker.random.number(),
    date: new Date(),
    ...args,
  })
);

export default makeGoalEntryInt;
