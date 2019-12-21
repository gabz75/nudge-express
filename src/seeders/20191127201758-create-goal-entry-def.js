export default {
  up: (queryInterface /* , Sequelize */) => {
    const now = new Date();

    return queryInterface.bulkInsert('GoalEntryDefs', [{
      goalEntryDefMapping: 'GoalEntryDefBool',
      friendlyName: 'Basic',
      description: 'The most basic way of tracking your goal, simply mark as done or not',
      createdAt: now,
      updatedAt: now,
    }, {
      goalEntryDefMapping: 'GoalEntryDefInt',
      friendlyName: 'Occurences',
      description: 'Define an unit and track more precisely how often, how much',
      createdAt: now,
      updatedAt: now,
    }], {});
  },

  down: (queryInterface /* , Sequelize */) => queryInterface.bulkDelete('GoalEntryDefs', null, {}),
};
