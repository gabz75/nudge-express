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
  GoalValueImpl: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType(goalValue /* , context, info */) {
      if (typeof goalValue.value === 'boolean') {
        return 'GoalValueBool';
      }

      if (goalValue) {
        return 'GoalValueInt';
      }

      return null;
    },
  },
  GoalValue: {
    moodReport: (parent /* , args, context, info */) => parent.getMoodReport(),
    goal: (parent /* , args, context, info */) => parent.getGoal(),
    value: (parent /* , args, context, info */) => {
      if (parent.goalValue === 'GoalValueInt') {
        return parent.getGoalValueInt();
      }

      if (parent.goalValue === 'GoalValueBool') {
        return parent.getGoalValueBool();
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
    goalValues: (parent /* , args, context, info */) => parent.getGoalValues(),
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
  MoodReport: {
    goalValues: (parent /* , args, context, info */) => parent.getGoalValues(),
  },
  Query: {
    getUsers: (parent, args, { db } /* , info */) => db.User.findAll(),
    getGoal: (parent, { id }, { db, authenticatedUser } /* , info */) => (
      db.Goal.findOne({ where: { id, UserId: authenticatedUser.id } })
    ),
    getGoals: (parent, args, { db, authenticatedUser } /* , info */) => (
      db.Goal.findAll({ where: { UserId: authenticatedUser.id } })
    ),
    getGoalTypes: (parent, args, { db } /* , info */) => db.GoalType.findAll(),
    getMoodReport: (parent, { id }, { db, authenticatedUser } /* , info */) => (
      db.MoodReport.findOne({ where: { id, UserId: authenticatedUser.id } })
    ),
    getMoodReports: (parent, args, { db, authenticatedUser } /* , info */) => (
      db.MoodReport.findAll({ where: { UserId: authenticatedUser.id } })
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
    createGoal: async (parent, args, { db, authenticatedUser } /* , info */) => {
      const { goalType, unit, ...otherArgs } = args;
      const GoalTypeModel = db[goalType]; // could be db.GoalTypeInt or db.GoalTypeBool
      const goalTypeModel = await db.GoalType.findOne({ where: { type: goalType } });
      const goalTypeInstance = await GoalTypeModel.create({
        GoalTypeId: goalTypeModel.id,
        unit,
      });
      return db.Goal.create({
        ...otherArgs,
        UserId: authenticatedUser.id,
        goalType,
        goalTypeId: goalTypeInstance.id,
      });
    },
    createMoodReport: async (parent, args, { db, authenticatedUser } /* , info */) => {
      const {
        score, doing, feelings, date, goalValues,
      } = args;

      const moodReport = await db.MoodReport.create({
        UserId: authenticatedUser.id,
        score,
        doing,
        feelings,
        date,
      });

      return Promise.all(goalValues.map(async ({ goalId, intValue, boolValue }) => {
        let goalValueConcrete;
        let goalValueType;

        if (intValue) {
          goalValueConcrete = await db.GoalValueInt.create({
            date,
            value: intValue,
          });
          goalValueType = 'GoalValueInt';
        }

        if (boolValue) {
          goalValueConcrete = await db.GoalValueBool.create({
            date,
            value: boolValue,
          });
          goalValueType = 'GoalValueBool';
        }

        if (!goalValueConcrete) {
          throw new Error('error with goal value concrete');
        }

        await db.GoalValue.create({
          MoodReportId: moodReport.id,
          GoalId: goalId,
          goalValueId: goalValueConcrete.id,
          goalValue: goalValueType,
        });
      })).then(() => moodReport);
    },
    updateGoal: async (parent, args, { db, authenticatedUser } /* , info */) => {
      const {
        id,
        goalType,
        unit,
        ...otherArgs
      } = args;

      const goal = await db.Goal.findOne({ where: { id, UserId: authenticatedUser.id } });

      if (!goal) {
        throw new Error('No goal found');
      }

      // janky
      // @todo refactor resolvers in separate file that handles transaction
      if (unit && goal.goalType === 'GoalTypeInt') {
        const goalTypeInt = await goal.getGoalTypeInt();
        await goalTypeInt.update({ unit });
      }

      // janky
      // @todo refactor resolvers in separate file that handles transaction
      if (goalType) {
        const GoalTypeModel = db[goalType]; // could be db.GoalTypeInt or db.GoalTypeBool
        const goalTypeModel = await db.GoalType.findOne({ where: { type: goalType } });
        const goalTypeInstance = await GoalTypeModel.create({
          GoalTypeId: goalTypeModel.id,
          unit,
        });

        return goal.update({
          ...otherArgs,
          goalType,
          goalTypeId: goalTypeInstance.id,
        });
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
