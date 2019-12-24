import faker from 'faker';

import db from '~/models';

export const makeGoalValueBool = (args) => (
  db.sequelize.models.GoalValueBool.create({
    value: faker.random.boolean(),
    date: new Date(),
    ...args,
  })
);

export default makeGoalValueBool;
