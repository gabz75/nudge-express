import { GraphQLDateTime } from 'graphql-iso-date';

export default {
  GoalEntryDefImpl: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType(goalEntryDef /* , context, info */) {
      if (goalEntryDef.unit) {
        return 'GoalEntryDefInt';
      }

      if (goalEntryDef) {
        return 'GoalEntryDefBool';
      }

      return null;
    },
  },
  GoalEnterable: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType(goalEnterable /* , context, info */) {
      if (typeof goalEnterable.value === 'boolean') {
        return 'GoalEntryBool';
      }

      if (goalEnterable) {
        return 'GoalEntryInt';
      }

      return null;
    },
  },
  GoalEntry: {
    moodReport: (parent /* , args, context, info */) => parent.getMoodReport(),
    goal: (parent /* , args, context, info */) => parent.getGoal(),
    entry: (parent /* , args, context, info */) => {
      if (parent.goalEnterable === 'goalEntryInt') {
        return parent.getGoalEntryInt();
      }

      if (parent.goalEnterable === 'goalEntryBool') {
        return parent.getGoalEntryBool();
      }

      return null;
    },
  },
  GoalEntryDefBool: {
    goalEntryDef: (parent /* , args, context, info */) => parent.getGoalEntryDef(),
  },
  GoalEntryDefInt: {
    goalEntryDef: (parent /* , args, context, info */) => parent.getGoalEntryDef(),
  },
  GoalEntryDef: {
    goalEntryDefs: (parent /* , args, context, info */) => parent.getGoalEntryDefs(),
  },
  User: {
    goals: (parent /* , args, context, info */) => parent.getGoals(),
    jwt: (parent /* , args, context, info */) => parent.getJWT(),
  },
  Goal: {
    user: (parent /* , args, context, info */) => parent.getUser(),
    goalEntries: (parent /* , args, context, info */) => parent.getGoalEntries(),
    goalEntryDef: (parent /* , args, context, info */) => {
      if (parent.goalEntryDef === 'goalEntryDefInt') {
        return parent.getGoalEntryDefInt();
      }

      if (parent.goalEntryDef === 'goalEntryDefBool') {
        return parent.getGoalEntryDefBool();
      }

      return null;
    },
  },
  Query: {
    getUsers: (parent, args, { db } /* , info */) => db.User.findAll(),
    getGoals: (parent, args, { db, authenticatedUser } /* , info */) => (
      db.Goal.findAll({ where: { UserId: authenticatedUser.id } })
    ),
    getGoal: (parent, { id }, { db, authenticatedUser } /* , info */) => (
      db.Goal.findOne({ where: { id, UserId: authenticatedUser.id } })
    ),
    getGoalEntryDefs: (parent, args, { db } /* , info */) => db.GoalEntryDef.findAll(),
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
