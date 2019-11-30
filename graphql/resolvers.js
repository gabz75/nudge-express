import { GraphQLDateTime } from 'graphql-iso-date';

export default {
  User: {
    nudges: (parent, args, context, info) => parent.getNudges(),
  },
  Nudge: {
    user: (parent, args, context, info) => parent.getUser(),
  },
  Query: {
    getUsers: (parent, args, { db }, info) => db.User.findAll(),
    getNudges: (parent, args, { db }, info) => db.Nudge.findAll(),
  },
  DateTime: GraphQLDateTime,
}
