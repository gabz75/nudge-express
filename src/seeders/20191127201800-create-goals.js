export default {
  up: async (queryInterface /* , Sequelize */) => {
    const [userRows] = await queryInterface.sequelize.query('SELECT id from Users;');
    const [goalTypeBoolRows] = await queryInterface.sequelize.query('SELECT id from GoalTypeBools;');
    const [goalTypeIntRows] = await queryInterface.sequelize.query('SELECT id from GoalTypeInts;');

    const userId = userRows[0].id;
    const goalTypeBoolId = goalTypeBoolRows[0].id;
    const goalTypeIntId = goalTypeIntRows[0].id;

    const createdAt = new Date();
    const updatedAt = new Date();

    await queryInterface.bulkInsert(
      'Goals', [
        {
          name: 'Meditate',
          color: '#dedede',
          archived: false,
          public: true,
          createdAt,
          updatedAt,
          userId,
          goalType: 'GoalTypeInt',
          goalTypeId: goalTypeIntId,
        },
        {
          name: 'Read',
          color: '#dedede',
          archived: false,
          public: true,
          createdAt,
          updatedAt,
          userId,
          goalType: 'GoalTypeBool',
          goalTypeId: goalTypeBoolId,
        },
      ],
      {},
    );

    const [moodReportRows] = await queryInterface.sequelize.query('SELECT id from MoodReports;');
    const [goalRows] = await queryInterface.sequelize.query('SELECT id from Goals;');
    const [goalValueIntRows] = await queryInterface.sequelize.query('SELECT id from GoalValueInts;');
    const [goalValueBoolRows] = await queryInterface.sequelize.query('SELECT id from GoalValueBools;');

    const moodReportId = moodReportRows[0].id;
    const goalValueIntId = goalValueIntRows[0].id;
    const goalValueBoolId = goalValueBoolRows[0].id;

    await queryInterface.bulkInsert(
      'GoalValues', [
        {
          goalId: goalRows[0].id,
          createdAt,
          updatedAt,
          moodReportId,
          goalValue: 'GoalValueInt',
          goalValueId: goalValueIntId,
        },
        {
          goalId: goalRows[1].id,
          createdAt,
          updatedAt,
          moodReportId,
          goalValue: 'GoalValueBool',
          goalValueId: goalValueBoolId,
        },
      ],
      {},
    );
  },

  down: (queryInterface /* , Sequelize */) => Promise.all([
    queryInterface.bulkDelete('GoalValues', null, {}),
    queryInterface.bulkDelete('Goals', null, {}),
  ]),
};
