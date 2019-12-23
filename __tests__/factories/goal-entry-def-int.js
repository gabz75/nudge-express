import faker from 'faker';

import db from '~/models';

const makeGoalEntryDefInt = (args) => (
  db.sequelize.models.GoalEntryDefInt.create({
    unit: faker.random.word(),
    ...args,
  })
);

export default makeGoalEntryDefInt;
