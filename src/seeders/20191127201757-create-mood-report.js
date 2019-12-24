export default {
  up: async (queryInterface /* , Sequelize */) => {
    const [userRows] = await queryInterface.sequelize.query('SELECT id from Users;');

    const userId = userRows[0].id;

    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    await queryInterface.bulkInsert(
      'MoodReports', [
        {
          date: now,
          createdAt: now,
          updatedAt: now,
          userId,
        },
        {
          date: tomorrow,
          createdAt: tomorrow,
          updatedAt: tomorrow,
          userId,
        },
      ],
      {},
    );
  },

  down: (queryInterface /* , Sequelize */) => queryInterface.bulkDelete('MoodReports', null, {}),
};
