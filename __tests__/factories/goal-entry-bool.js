import faker from 'faker';

import db from '~/models';

const makeGoalEntryBool = (args) => (
  db.sequelize.models.GoalEntryBool.create({
    value: faker.random.boolean(),
    date: new Date(),
    ...args,
  })
);

export default makeGoalEntryBool;
