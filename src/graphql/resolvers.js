import { GraphQLDateTime } from 'graphql-iso-date';

export default {
  GoalTypeImpl: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType(goalType /* , context, info */) {
      if (goalType.unit) {
        return 'GoalTypeInt';
      }

      if (goalType) {
        return 'GoalTypeBool';
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
  GoalTypeBool: {
    goalType: (parent /* , args, context, info */) => parent.getGoalType(),
  },
  GoalTypeInt: {
    goalType: (parent /* , args, context, info */) => parent.getGoalType(),
  },
  User: {
    goals: (parent /* , args, context, info */) => parent.getGoals(),
    jwt: (parent /* , args, context, info */) => parent.getJWT(),
  },
  Goal: {
    user: (parent /* , args, context, info */) => parent.getUser(),
    goalEntries: (parent /* , args, context, info */) => parent.getGoalEntries(),
    goalTypeImpl: (parent /* , args, context, info */) => {
      if (parent.goalType === 'GoalTypeInt') {
        return parent.getGoalTypeInt();
      }

      if (parent.goalType === 'GoalTypeBool') {
        return parent.getGoalTypeBool();
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
    getGoalTypes: (parent, args, { db } /* , info */) => db.GoalType.findAll(),
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
