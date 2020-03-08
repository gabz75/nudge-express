import db from '~/models';

export const makeGoalValue = (args) => (
  db.sequelize.models.GoalValue.create(args)
);

export default makeGoalValue;
