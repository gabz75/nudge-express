import db from '~/models';

const DATA = [
  {
    goalEntryDefMapping: 'GoalEntryDefBool',
    friendlyName: 'Basic',
    description: 'The most basic way of tracking your goal, simply mark as done or not',
  },
  {
    goalEntryDefMapping: 'GoalEntryDefInt',
    friendlyName: 'Occurences',
    description: 'Define an unit and track more precisely how often, how much',
  },
];

const makeGoalEntryDef = (args) => (
  db.sequelize.models.GoalEntryDef.create({
    goalEntryDefMapping: DATA[0].goalEntryDefMapping,
    friendlyName: DATA[0].friendlyName,
    description: DATA[0].description,
    ...args,
  })
);

export default makeGoalEntryDef;
