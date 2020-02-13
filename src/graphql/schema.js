export default `
  scalar DateTime

  directive @isAuthenticated on FIELD_DEFINITION
  directive @privateField on FIELD_DEFINITION

  interface GoalTypeImpl {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime
    goalType: GoalType
  }

  interface GoalValueImpl {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type GoalType {
    id: ID!
    type: String
    friendlyName: String
    description: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type GoalTypeBool implements GoalTypeImpl {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime
    goalType: GoalType
  }

  type GoalTypeInt implements GoalTypeImpl {
    id: ID!
    unit: String
    createdAt: DateTime
    updatedAt: DateTime
    goalType: GoalType
  }

  type GoalValueBool implements GoalValueImpl {
    id: ID!
    value: Boolean
    goalValue: GoalValue
    createdAt: DateTime
    updatedAt: DateTime
  }

  type GoalValueInt implements GoalValueImpl {
    id: ID!
    value: Int
    goalValue: GoalValue
    createdAt: DateTime
    updatedAt: DateTime
  }

  type MoodReport {
    id: ID!
    score: Int
    doing: String
    feelings: String
    user: User
    date: DateTime
    goalValues: [GoalValue]
    createdAt: DateTime
    updatedAt: DateTime
  }

  type GoalValue {
    id: ID!
    moodReport: MoodReport
    goal: Goal
    value: GoalValueImpl
  }

  type User {
    id: ID!
    name: String!
    email: String!
    goals: [Goal] @privateField
    jwt: String @privateField
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Goal {
    id: ID!
    name: String!
    color: String
    archived: Boolean
    public: Boolean
    user: User!
    goalValues: [GoalValue]
    goalTypeImpl: GoalTypeImpl
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    getUsers: [User] @isAuthenticated
    getGoals: [Goal] @isAuthenticated
    getGoal(id: ID!): Goal @isAuthenticated
    getGoalTypes: [GoalType] @isAuthenticated
    getMoodReport(id: ID!): MoodReport @isAuthenticated
    getMoodReports: [MoodReport] @isAuthenticated
  }

  input GoalValueInput {
    goalId: ID!,
    boolValue: Boolean,
    intValue: Int
  }

  type Mutation {
    createUser(email: String!, name: String!, password: String!): User
    login(email: String, password: String): User
    createGoal(name: String!, color: String, public: Boolean, goalType: String!, unit: String): Goal @isAuthenticated

    updateGoal(
      id: ID!,
      name: String,
      color: String,
      archived: Boolean,
      public: Boolean,
      goalType: String,
      unit: String
    ): Goal @isAuthenticated

    createMoodReport(
      score: Int,
      doing: String,
      feelings: String,
      date: DateTime,
      goalValues: [GoalValueInput]
    ): MoodReport @isAuthenticated

    updateMoodReport(
      id: ID!,
      score: Int,
      doing: String,
      feelings: String,
      date: DateTime,
      goalValues: [GoalValueInput]
    ): MoodReport @isAuthenticated

    deleteGoal(id: ID!): Goal @isAuthenticated
  }
`;
