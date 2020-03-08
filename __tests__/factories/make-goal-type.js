import db from '~/models';

const { GoalType } = db.sequelize.models;

const DATA = {
  GoalTypeBool: {
    type: 'GoalTypeBool',
    friendlyName: 'Basic',
    description: 'The most basic way of tracking your goal, simply mark as done or not',
  },
  GoalTypeInt: {
    type: 'GoalTypeInt',
    friendlyName: 'Occurences',
    description: 'Define an unit and track more precisely how often, how much',
  },
};

export const makeGoalType = (args = {}) => {
  const { type, ...rest } = args;
  const data = DATA[type || 'GoalTypeBool'];

  return GoalType.create({
    type: data.type,
    friendlyName: data.friendlyName,
    description: data.description,
    ...rest,
  });
};

export async function getGoalType(type = 'GoalTypeInt') {
  const goalType = await GoalType.findOne({ where: { type } });

  if (goalType) {
    return goalType;
  }

  return makeGoalType({ type });
}

export default makeGoalType;
