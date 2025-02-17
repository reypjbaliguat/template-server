import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers.js';

const typeDefs = `
  type User {
    id: ID!
    email: String!
    role: String!
    token: String
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
    getTemplates(userId: ID!): [Template!]!
    getTemplate(id: ID!): Template!
  }

  type Mutation {
    signUp(email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    googleLogin(token: String!): User!
    addTemplate(title: String!, body: String!, userId: ID!): Template!
    updateTemplate(title: String, body: String, id: ID!): Template!
    deleteTemplate(id: ID!): Template!
  }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
