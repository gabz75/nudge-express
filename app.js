'use strict';

const express = require('express');
const { sequelize } = require('./models');
const Nudge = sequelize.models.Nudge ;

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/nudges', (req, res) => {
  Nudge.findAll().then((nudges) => {
    res.setHeader('Content-Type', 'text/json');
    res.send(JSON.stringify(nudges));
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

