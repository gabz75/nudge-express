import db from '~/models';

const DATA = [
  {
    type: 'GoalTypeBool',
    friendlyName: 'Basic',
    description: 'The most basic way of tracking your goal, simply mark as done or not',
  },
  {
    type: 'GoalTypeInt',
    friendlyName: 'Occurences',
    description: 'Define an unit and track more precisely how often, how much',
  },
];

const makeGoalType = (args) => (
  db.sequelize.models.GoalType.create({
    type: DATA[0].type,
    friendlyName: DATA[0].friendlyName,
    description: DATA[0].description,
    ...args,
  })
);

export default makeGoalType;
