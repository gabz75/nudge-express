import { getGoalType } from 'tests/factories/make-goal-type';

import db from '~/models';

const { GoalTypeBool } = db.sequelize.models;

export const makeGoalTypeBool = async (args = {}) => {
  if (!args.goalType) {
    const goaType = await getGoalType('GoalTypeBool');
    args.GoalTypeId = goaType.id;
  }

  return GoalTypeBool.create({
    ...args,
  });
};

export default makeGoalTypeBool;
