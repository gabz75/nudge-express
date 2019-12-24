import db from '~/models';

export const makeGoalEntry = (args) => (
  db.sequelize.models.GoalEntry.create({
    date: new Date(),
    ...args,
  })
);

export default makeGoalEntry;
