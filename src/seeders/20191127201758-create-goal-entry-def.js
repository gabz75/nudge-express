export default {
  up: async (queryInterface /* , Sequelize */) => {
    const now = new Date();

    await queryInterface.bulkInsert('GoalEntryDefs', [{
      type: 'GoalEntryDefBool',
      friendlyName: 'Basic',
      description: 'The most basic way of tracking your goal, simply mark as done or not',
      createdAt: now,
      updatedAt: now,
    }, {
      type: 'GoalEntryDefInt',
      friendlyName: 'Occurences',
      description: 'Define an unit and track more precisely how often, how much',
      createdAt: now,
      updatedAt: now,
    }], {});

    const [goalEntryDefRows] = await queryInterface.sequelize.query('SELECT id from GoalEntryDefs;');

    await queryInterface.bulkInsert(
      'GoalEntryDefBools', [
        {
          createdAt: now,
          updatedAt: now,
          goalEntryDefId: goalEntryDefRows[0].id,
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
          goalEntryDefId: goalEntryDefRows[1].id,
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
