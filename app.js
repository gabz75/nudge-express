'use strict';

import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express';

import db from './models';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
const Nudge = db.sequelize.models.Nudge ;

// Apollo!
const server = new ApolloServer({
  typeDefs: gql(schema),
  resolvers,
  context: { db }
});

// App
const app = express();

server.applyMiddleware({ app });

app.get('/nudges', (req, res) => {
  Nudge.findAll().then((nudges) => {
    res.setHeader('Content-Type', 'text/json');
    res.send(JSON.stringify(nudges));
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

