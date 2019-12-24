import db from '~/models';

export const makeGoalValue = (args) => (
  db.sequelize.models.GoalValue.create({
    date: new Date(),
    ...args,
  })
);

export default makeGoalValue;
