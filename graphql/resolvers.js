import { GraphQLDateTime } from 'graphql-iso-date';

export default {
  User: {
    nudges: (parent, args, context, info) => parent.getNudges(),
    jwt: (parent, args, context ,info) => parent.getJWT(),
  },
  Nudge: {
    user: (parent, args, context, info) => parent.getUser(),
  },
  Query: {
    getUsers: (parent, args, { db }, info) => db.User.findAll(),
    getNudges: (parent, args, { db }, info) => db.Nudge.findAll(),
  },
  Mutation: {
    createUser: (parent, args, { db }, info) => db.User.create(args),
    login: async (parent, args, { db }, info) => {
      const user = await db.User.findOne({ where: { email: args['email'] }});

      if (!user) {
        throw new Error('no user found');
      }

      if (!user.verifyPassword(args['password'])) {
        throw new Error('invalid password');
      }

      return user;
    }
  },
  DateTime: GraphQLDateTime,
}
