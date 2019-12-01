'use strict';

import express from 'express'
import jwt from 'express-jwt';
import { ApolloServer, gql } from 'apollo-server-express';

import db from './models';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import schemaDirectives from './graphql/directives';
import { ENV } from './config';

// App
const app = express();

const authMiddleware = jwt({
    secret: ENV.JWT_ENCRYPTION,
    credentialsRequired: false,
});

app.use(authMiddleware);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ code: 401, success: false, message: `${err.name}: ${err.message}` });
    } else {
        return res.status(400).json({ code: 400, success: false, message: `${err.name}: ${err.message}` });
    }
});

// Apollo!
const server = new ApolloServer({
  typeDefs: gql(schema),
  resolvers,
  schemaDirectives,
  context: ({ req, res }) => {
    return {
      db,
      req,
      res,
      jwtPayload: req.user, // jwt payload, express-jwt automatically decodes the Authorization header
    };
  }
});

server.applyMiddleware({ app });

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/json');
  res.json({ code: 200, success: true, name: 'nudge-express', version: '0.0.1' });
});

app.listen(ENV.PORT, ENV.HOST);

console.log(`Running on http://${ENV.HOST}:${ENV.PORT}`);

