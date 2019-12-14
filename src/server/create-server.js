import { ApolloServer, gql } from 'apollo-server-express';

import schema from '~/graphql/schema';
import resolvers from '~/graphql/resolvers';
import schemaDirectives from '~/graphql/directives';

export const createServer = (context) => (
  new ApolloServer({
    typeDefs: gql(schema),
    resolvers,
    schemaDirectives,
    context,
  })
);

export default createServer;
