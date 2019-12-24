export default {
  up: async (queryInterface /* , Sequelize */) => {
    const now = new Date();

    await queryInterface.bulkInsert('GoalTypes', [{
      type: 'GoalTypeBool',
      friendlyName: 'Basic',
      description: 'The most basic way of tracking your goal, simply mark as done or not',
      createdAt: now,
      updatedAt: now,
    }, {
      type: 'GoalTypeInt',
      friendlyName: 'Occurences',
      description: 'Define an unit and track more precisely how often, how much',
      createdAt: now,
      updatedAt: now,
    }], {});

    const [goalTypeRows] = await queryInterface.sequelize.query('SELECT id from GoalTypes;');

    await queryInterface.bulkInsert(
      'GoalTypeBools', [
        {
          createdAt: now,
          updatedAt: now,
          goalTypeId: goalTypeRows[0].id,
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'GoalTypeInts', [
        {
          unit: 'minute',
          createdAt: now,
          updatedAt: now,
          goalTypeId: goalTypeRows[1].id,
        },
      ],
      {},
    );
  },

  down: (queryInterface /* , Sequelize */) => Promise.all([
    queryInterface.bulkDelete('GoalTypes', null, {}),
    queryInterface.bulkDelete('GoalTypeBools', null, {}),
    queryInterface.bulkDelete('GoalTypeInts', null, {}),
  ]),
};
