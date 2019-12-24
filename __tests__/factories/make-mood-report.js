import faker from 'faker';

import db from '~/models';

export const makeMoodReport = (args) => (
  db.sequelize.models.MoodReport.create({
    score: faker.random.number(),
    date: new Date(),
    doing: faker.lorem.paragraph(),
    feelings: faker.lorem.paragraph(),
    ...args,
  })
);

export default makeMoodReport;
