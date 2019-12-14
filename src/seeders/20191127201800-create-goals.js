export default {
  up: async (queryInterface /* , Sequelize */) => {
    const usersRow = await queryInterface.sequelize.query('SELECT id from Users;');

    const primaryUserId = usersRow[0][0].id;

    return queryInterface.bulkInsert(
      'Goals', [
        {
          name: 'Meditate',
          color: '#dedede',
          archived: false,
          public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: primaryUserId,
        },
        {
          name: 'Read',
          color: '#dedede',
          archived: false,
          public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: primaryUserId,
        },
        {
          name: 'Climb',
          color: '#dedede',
          archived: false,
          public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: primaryUserId,
        },
        {
          name: 'Yoga',
          color: '#dedede',
          archived: false,
          public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: primaryUserId,
        },
        {
          name: 'Run',
          color: '#dedede',
          archived: false,
          public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: primaryUserId,
        },
        {
          name: 'Physical Therapy',
          color: '#dedede',
          archived: false,
          public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: primaryUserId,
        },
        {
          name: 'Cycle',
          color: '#dedede',
          archived: false,
          public: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: primaryUserId,
        },
        {
          name: 'No alcohol',
          color: '#dedede',
          archived: false,
          public: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: primaryUserId,
        },
        {
          name: 'No sugar',
          color: '#dedede',
          archived: false,
          public: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: primaryUserId,
        },
        {
          name: 'No coffee',
          color: '#dedede',
          archived: false,
          public: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: primaryUserId,
        },
      ],
      {},
    );
  },

  down: (queryInterface /* , Sequelize */) => queryInterface.bulkDelete('Goals', null, {}),
};
