export default `
  scalar DateTime

  directive @isAuthenticated on FIELD_DEFINITION

  type User {
    id: ID!
    name: String!
    email: String!
    nudges: [Nudge]
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
`;


// type Mutation {
//    addUser(email: String, name: String, password: String): User
//    addNudge(name: String!, color: String, public: Boolean, userId: ID!): Nudge
//    updateNudge(id: ID!, name: String, color: String, archive: Boolean, public: Boolean): Nudge
//  }
