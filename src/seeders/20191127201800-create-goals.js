export default {
  up: async (queryInterface /* , Sequelize */) => {
    const [userRows] = await queryInterface.sequelize.query('SELECT id from Users;');
    const [goalEntryDefBoolRows] = await queryInterface.sequelize.query('SELECT id from GoalEntryDefBools;');
    const [goalEntryDefIntRows] = await queryInterface.sequelize.query('SELECT id from GoalEntryDefInts;');

    const userId = userRows[0].id;
    const goalEntryDefBoolId = goalEntryDefBoolRows[0].id;
    const goalEntryDefIntId = goalEntryDefIntRows[0].id;

    await queryInterface.bulkInsert(
      'Goals', [
        {
          name: 'Meditate',
          color: '#dedede',
          archived: false,
          public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId,
          goalEntryDef: 'goalEntryDefInt',
          goalEntryDefId: goalEntryDefIntId,
        },
        {
          name: 'Read',
          color: '#dedede',
          archived: false,
          public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId,
          goalEntryDef: 'goalEntryDefBool',
          goalEntryDefId: goalEntryDefBoolId,
        },
      ],
      {},
    );

    const [moodReportRows] = await queryInterface.sequelize.query('SELECT id from MoodReports;');
    const [goalRows] = await queryInterface.sequelize.query('SELECT id from Goals;');

    const moodReportId = moodReportRows[0].id;

    return Promise.all(goalRows.map(async (goal) => {
      await queryInterface.bulkInsert(
        'GoalEntries', [
          {
            goalId: goal.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            moodReportId,
          },
          {
            goalId: goal.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            moodReportId,
          },
        ],
        {},
      );
    }));
  },

  down: (queryInterface /* , Sequelize */) => queryInterface.bulkDelete('Goals', null, {}),
};
