import faker from 'faker';

import db from '~/models';

const makeGoalEntryDef = (args) => (
  db.sequelize.models.GoalEntryDef.create({
    goalEntryDefMapping: faker.lorem.word(),
    friendlyName: faker.lorem.word(),
    description: faker.lorem.word(),
    ...args,
  })
);

export default makeGoalEntryDef;
