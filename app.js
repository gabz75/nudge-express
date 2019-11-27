'use strict';

const express = require('express');

const sequelize = require('./models');
const { DummyNudge } = require('./models/dummy-nudge');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


app.get('/', (req, res) => {
  DummyNudge.findAll().then((nudges) => {
    console.log(nudges);
    res.send(JSON.stringify(nudges));
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

