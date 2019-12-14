import { GraphQLDateTime } from 'graphql-iso-date';

export default {
  User: {
    goals: (parent /* , args, context, info */) => parent.getGoals(),
    jwt: (parent /* , args, context, info */) => parent.getJWT(),
  },
  Goal: {
    user: (parent /* , args, context, info */) => parent.getUser(),
  },
  Query: {
    getUsers: (parent, args, { db } /* , info */) => db.User.findAll(),
    getGoals: (parent, args, { db, authenticatedUser } /* , info */) => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(db.Goal.findAll({ where: { UserId: authenticatedUser.id } }));
        }, 0);
      })
    ),
    getGoal: (parent, { id }, { db, authenticatedUser } /* , info */) => (
      db.Goal.findOne({ where: { id, UserId: authenticatedUser.id } })
    ),
  },
  Mutation: {
    createUser: (parent, args, context /* , info */) => {
      const { db } = context;
      context.ignorePrivateFieldDirective = true;

      return db.User.create(args);
    },
    login: async (parent, args, context /* , info */) => {
      const { db } = context;
      const user = await db.User.findOne({ where: { email: args.email } });

      if (!user) {
        throw new Error('no user found');
      }

      if (!user.verifyPassword(args.password)) {
        throw new Error('invalid password');
      }

      context.ignorePrivateFieldDirective = true;

      return user;
    },
    createGoal: (parent, args, { db, authenticatedUser } /* , info */) => (
      db.Goal.create({ ...args, UserId: authenticatedUser.id })
    ),
    updateGoal: async (parent, args, { db, authenticatedUser } /* , info */) => {
      const { id, ...otherArgs } = args;

      const goal = await db.Goal.findOne({ where: { id, UserId: authenticatedUser.id } });

      if (!goal) {
        throw new Error('No goal found');
      }

      return goal.update(otherArgs);
    },
    deleteGoal: async (parent, args, { db, authenticatedUser } /* , info */) => {
      const { id } = args;
      const goal = await db.Goal.findOne({ where: { id, UserId: authenticatedUser.id } });

      if (!goal) {
        throw new Error('No goal found');
      }

      return goal.destroy();
    },
  },
  DateTime: GraphQLDateTime,
};
