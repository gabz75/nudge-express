export default {
  up: async (queryInterface /* , Sequelize */) => {
    const now = new Date();

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
    queryInterface.bulkDelete('GoalEntryDefBools', null, {}),
    queryInterface.bulkDelete('GoalEntryDefInts', null, {}),
  ]),
};
