import faker from 'faker';

import { getGoalType } from 'tests/factories/make-goal-type';

import db from '~/models';

const { GoalTypeInt } = db.sequelize.models;

export const makeGoalTypeInt = async (args = {}) => {
  if (!args.goalType) {
    const goaType = await getGoalType('GoalTypeInt');
    args.GoalTypeId = goaType.id;
  }

  return GoalTypeInt.create({
    unit: faker.random.word(),
    ...args,
  });
};

export default makeGoalTypeInt;
