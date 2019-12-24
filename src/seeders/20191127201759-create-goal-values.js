export default {
  up: async (queryInterface /* , Sequelize */) => {
    const now = new Date();

    await queryInterface.bulkInsert(
      'GoalValueBools', [
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
      'GoalValueInts', [
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
    queryInterface.bulkDelete('GoalValueBools', null, {}),
    queryInterface.bulkDelete('GoalValueInts', null, {}),
  ]),
};
