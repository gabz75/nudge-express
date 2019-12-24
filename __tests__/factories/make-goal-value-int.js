import faker from 'faker';

import db from '~/models';

export const makeGoalValueInt = (args) => (
  db.sequelize.models.GoalValueInt.create({
    value: faker.random.number(),
    date: new Date(),
    ...args,
  })
);

export default makeGoalValueInt;
