import { createTestClient as apolloCreateTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server-express';

import db from '../../models';
import schema from '../../graphql/schema';
import resolvers from '../../graphql/resolvers';
import schemaDirectives from '../../graphql/directives';

const req = {};
const res = {};

const server = new ApolloServer({
  typeDefs: gql(schema),
  resolvers,
  schemaDirectives,
  context: () => {
    return {
      db,
      req,
      res,
      jwtPayload: req && req.user, // jwt payload, express-jwt automatically decodes the Authorization header
    };
  },
});

export const setAuthenticatedUser = (user) => {
  req.user = user;
};

export const createTestClient = () => {
  return apolloCreateTestClient(server);
};

export default {
  server,
  setAuthenticatedUser,
  createTestClient,
};
