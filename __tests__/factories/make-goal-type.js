import db from '~/models';

const DATA = {
  goalTypeBool: {
    type: 'GoalTypeBool',
    friendlyName: 'Basic',
    description: 'The most basic way of tracking your goal, simply mark as done or not',
  },
  goalTypeInt: {
    type: 'GoalTypeInt',
    friendlyName: 'Occurences',
    description: 'Define an unit and track more precisely how often, how much',
  },
};

export const makeGoalType = (args) => {
  const { type, ...rest } = args || {};
  const data = DATA[type || 'goalTypeBool'];

  return db.sequelize.models.GoalType.create({
    type: data.type,
    friendlyName: data.friendlyName,
    description: data.description,
    ...rest,
  });
};

export default makeGoalType;
