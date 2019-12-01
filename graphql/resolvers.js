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
    },
    createNudge: (parent, args, { db, authenticatedUser }, info) => {
      return db.Nudge.create({ ...args, UserId: authenticatedUser.id });
    },
    updateNudge: async (parent, args, { db, authenticatedUser }, info) => {
      const { id, ...otherArgs } = args;

      const nudge = await db.Nudge.findOne({where: { id: id, UserId: authenticatedUser.id }});

       if (!nudge) {
         throw new Error('No nudge found');
       }

      return nudge.update(otherArgs);
    },
    deleteNudge: async (parent, args, { db, authenticatedUser }, info) => {
      const { id } = args;
      const nudge = await db.Nudge.findOne({where: { id: id, UserId: authenticatedUser.id }});

       if (!nudge) {
         throw new Error('No nudge found');
       }

       return nudge.destroy();
    },
  },
  DateTime: GraphQLDateTime,
};
