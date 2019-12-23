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
    const [goalEntryIntRows] = await queryInterface.sequelize.query('SELECT id from GoalEntryInts;');
    const [goalEntryBoolRows] = await queryInterface.sequelize.query('SELECT id from GoalEntryBools;');

    const moodReportId = moodReportRows[0].id;
    const goalEntryIntId = goalEntryIntRows[0].id;
    const goalEntryBoolId = goalEntryBoolRows[0].id;

    await queryInterface.bulkInsert(
      'GoalEntries', [
        {
          goalId: goalRows[0].id,
          date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          moodReportId,
          goalEnterable: 'goalEntryInt',
          goalEnterableId: goalEntryIntId,
        },
        {
          goalId: goalRows[1].id,
          date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          moodReportId,
          goalEnterable: 'goalEntryBool',
          goalEnterableId: goalEntryBoolId,
        },
      ],
      {},
    );
  },

  down: (queryInterface /* , Sequelize */) => Promise.all([
    queryInterface.bulkDelete('Goals', null, {}),
    queryInterface.bulkDelete('GoalEntries', null, {}),
  ]),
};
