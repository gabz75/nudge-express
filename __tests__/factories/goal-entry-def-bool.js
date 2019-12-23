import db from '~/models';

const makeGoalEntryDefBool = (args) => (
  db.sequelize.models.GoalEntryDefBool.create({
    ...args,
  })
);

export default makeGoalEntryDefBool;
