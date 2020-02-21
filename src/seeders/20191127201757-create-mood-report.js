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
          score: 10,
          doing: 'Lorem ipsum',
          feelings: 'Lorem ipsum',
        },
        {
          date: tomorrow,
          createdAt: tomorrow,
          updatedAt: tomorrow,
          userId,
          score: 10,
          doing: 'Lorem ipsum',
          feelings: 'Lorem ipsum',
        },
      ],
      {},
    );
  },

  down: (queryInterface /* , Sequelize */) => queryInterface.bulkDelete('MoodReports', null, {}),
};
