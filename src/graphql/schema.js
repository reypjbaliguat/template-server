const { makeExecutableSchema } = require('@graphql-tools/schema');
const { resolvers } = require('./resolvers');

const typeDefs = `
  type User {
    id: ID!
    email: String!
    role: String!
    token: String
    otpCode: String
    otpExpires: String
    isVerified: Boolean!
    lastOtpRequest: String
    createdAt: String!
    updatedAt: String!
  }

  type Template {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getTemplates: [Template!]!
    getTemplate(id: ID!): Template!
  }

  type Mutation {
    signUp(email: String!, password: String!): String!
    login(email: String!, password: String!): User!
    googleLogin(token: String!): User!
    verifyOTP(email: String!, otpCode: String!): User
    resendOTP(email: String!): String
    addTemplate(title: String!, body: String!): Template!
    updateTemplate(title: String, body: String, id: ID!): Template!
    deleteTemplate(id: ID!): Template!
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = {
    schema,
};
