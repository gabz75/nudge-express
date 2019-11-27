const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  database: 'nudge',
  username: 'root',
  password: 'root',
  dialect: 'mysql'
});

module.exports = sequelize;

const { init } = require('./dummy-nudge');

init(sequelize);
