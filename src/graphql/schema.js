export default `
  scalar DateTime

  directive @isAuthenticated on FIELD_DEFINITION
  directive @privateField on FIELD_DEFINITION

  interface GoalEntryDefProxy {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime
  }

  interface GoalEnterable {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type GoalEntryDef {
    id: ID!
    goalEntryDefMapping: String
    friendlyName: String
    description: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type GoalEntryDefBool implements GoalEntryDefProxy {
    id: ID!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type GoalEntryDefInt implements GoalEntryDefProxy {
    id: ID!
    unit: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type GoalEntryBool implements GoalEnterable {
    id: ID!
    value: Boolean
    goalEntry: GoalEntry
    createdAt: DateTime
    updatedAt: DateTime
  }

  type GoalEntryInt implements GoalEnterable {
    id: ID!
    value: Int
    goalEntry: GoalEntry
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
    createdAt: DateTime
    updatedAt: DateTime
  }

  type GoalEntry {
    id: ID!
    moodReport: MoodReport
    goal: Goal
    entry: GoalEnterable
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
    goalEntries: [GoalEntry]
    goalEntryDef: GoalEntryDefProxy
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    getUsers: [User] @isAuthenticated
    getGoals: [Goal] @isAuthenticated
    getGoal(id: ID!): Goal @isAuthenticated
    getGoalEntryDefs: [GoalEntryDef] @isAuthenticated
  }

  type Mutation {
    createUser(email: String!, name: String!, password: String!): User
    login(email: String, password: String): User
    createGoal(name: String!, color: String, public: Boolean): Goal @isAuthenticated
    updateGoal(id: ID!, name: String, color: String, archived: Boolean, public: Boolean): Goal @isAuthenticated
    deleteGoal(id: ID!): Goal @isAuthenticated
  }
`;
