export default `
  type User {
    id: ID!
    name: String!
    email: String!
    nudges: [Nudge]
  }

  type Nudge {
    id: ID!
    name: String!
    color: String
    archived: Boolean
    public: Boolean
    user: User!
  }

  type Query {
    getUsers: [User]
    getNudges: [Nudge]
  }
`;


// type Mutation {
//    addUser(email: String, name: String, password: String): User
//    addNudge(name: String!, color: String, public: Boolean, userId: ID!): Nudge
//    updateNudge(id: ID!, name: String, color: String, archive: Boolean, public: Boolean): Nudge
//  }
