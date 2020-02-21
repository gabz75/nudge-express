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
  GoalValue: {
    moodReport: (parent /* , args, context, info */) => parent.getMoodReport(),
    goal: (parent /* , args, context, info */) => parent.getGoal(),
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
    goalTypeImpl: (parent /* , args, context, info */) => parent.getGoalType(),
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

      return Promise.all(goalValues.map(({
        goalId,
        intValue,
        boolValue,
        floatValue,
        stringValue,
      }) => (
        db.GoalValue.create({
          MoodReportId: moodReport.id,
          GoalId: goalId,
          intValue,
          boolValue,
          floatValue,
          stringValue,
        })
      ))).then(() => moodReport);
    },
    updateMoodReport: async (parent, args, { db, authenticatedUser } /* , info */) => {
      const {
        id, score, doing, feelings, date, goalValues,
      } = args;

      const moodReport = await db.MoodReport.findOne({ where: { id, UserId: authenticatedUser.id } });

      moodReport.update({
        score,
        doing,
        feelings,
        date,
      });

      if (!moodReport) {
        throw new Error('No goal found');
      }

      return Promise.all(goalValues.map(async ({
        goalId,
        intValue,
        boolValue,
        floatValue,
        stringValue,
      }) => {
        const goalValue = await db.GoalValue.findOne({
          where: {
            GoalId: goalId,
            MoodReportId: moodReport.id,
          },
        });

        if (!goalValue) {
          throw new Error(`GoalValue not found for id ${goalId}`);
        }

        return goalValue.update({
          intValue,
          boolValue,
          floatValue,
          stringValue,
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
