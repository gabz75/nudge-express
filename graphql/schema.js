export default `
  scalar DateTime

  directive @isAuthenticated on FIELD_DEFINITION

  type User {
    id: ID!
    name: String!
    email: String!
    nudges: [Nudge]
    jwt: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Nudge {
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
    getNudges: [Nudge] @isAuthenticated
  }

  type Mutation {
     createUser(email: String, name: String, password: String): User
     login(email: String, password: String): User
   }
`;



