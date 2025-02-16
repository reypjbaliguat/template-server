import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers.js';

const typeDefs = `
  type User {
    id: ID!
    email: String!
    role: String!
    token: String
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
  }

  type Order {
    id: ID!
    products: [String!]!
    totalPrice: Float!
  }

  type Query {
    me: User
    products: [Product!]!
    orderHistory: [Order!]!
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    signUp(email: String!, password: String!): User!
    login(email: String!, password: String!): String!
    googleLogin(token: String!): User
    addProduct(name: String!, price: Float!): Product!
    addToCart(products: [String!]!, totalPrice: Float!): Order!
  }
`;

export const schema = makeExecutableSchema({ typeDefs, resolvers });
