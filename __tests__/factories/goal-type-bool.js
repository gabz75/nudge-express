import db from '~/models';

const makeGoalTypeBool = (args) => (
  db.sequelize.models.GoalTypeBool.create({
    ...args,
  })
);

export default makeGoalTypeBool;
