const { gql } = require('apollo-server');
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    _id: ID!,
    id: Float,
    firstName: String,
    lastName: String,
    email: String,
    paid: Boolean,
    verified: Boolean
  }
  type Query {
     user: [User],
  }
`;

module.exports = typeDefs;