export default {
  up: async (queryInterface /* , Sequelize */) => {
    const now = new Date();

    await queryInterface.bulkInsert(
      'GoalEntryBools', [
        {
          value: true,
          date: now,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'GoalEntryInts', [
        {
          value: 10,
          date: now,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {},
    );
  },

  down: (queryInterface /* , Sequelize */) => Promise.all([
    queryInterface.bulkDelete('GoalEntryBools', null, {}),
    queryInterface.bulkDelete('GoalEntryInts', null, {}),
  ]),
};
