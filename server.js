import { ApolloServer, gql } from 'apollo-server-express';

import db from './models';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import schemaDirectives from './graphql/directives';

const server = new ApolloServer({
  typeDefs: gql(schema),
  resolvers,
  schemaDirectives,
  context: ({ req, res }) => {
    return {
      db,
      req,
      res,
      jwtPayload: req && req.user, // jwt payload, express-jwt automatically decodes the Authorization header
    };
  },
});

export default server;
