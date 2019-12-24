import db from '~/models';

export const makeGoalTypeBool = (args) => (
  db.sequelize.models.GoalTypeBool.create({
    ...args,
  })
);

export default makeGoalTypeBool;
