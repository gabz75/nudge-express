export default `
  scalar DateTime

  directive @isAuthenticated on FIELD_DEFINITION

  type User {
    id: ID!
    name: String!
    email: String!
    goals: [Goal]
    jwt: String
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
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    getUsers: [User] @isAuthenticated
    getGoals: [Goal] @isAuthenticated
    getGoal(id: ID!): Goal @isAuthenticated
  }

  type Mutation {
     createUser(email: String!, name: String!, password: String!): User
     login(email: String, password: String): User
     createGoal(name: String!, color: String, public: Boolean): Goal @isAuthenticated
     updateGoal(id: ID!, name: String, color: String, archived: Boolean, public: Boolean): Goal @isAuthenticated
     deleteGoal(id: ID!): Goal @isAuthenticated
   }
`;
