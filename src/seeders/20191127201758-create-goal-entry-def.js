export default {
  up: async (queryInterface /* , Sequelize */) => {
    const now = new Date();

    await queryInterface.bulkInsert('GoalEntryDefs', [{
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

    await queryInterface.bulkInsert(
      'GoalEntryDefBools', [
        {
          createdAt: now,
          updatedAt: now,
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'GoalEntryDefInts', [
        {
          unit: 'minute',
          createdAt: now,
          updatedAt: now,
        },
      ],
      {},
    );
  },

  down: (queryInterface /* , Sequelize */) => Promise.all([
    queryInterface.bulkDelete('GoalEntryDefs', null, {}),
    queryInterface.bulkDelete('GoalEntryDefBools', null, {}),
    queryInterface.bulkDelete('GoalEntryDefInts', null, {}),
  ]),
};
