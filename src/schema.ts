import { gql } from "apollo-server";

export const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    books: [Book!]
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Query {
    authors: [Author!]
    books: [Book!]
  }

  type Mutation {
    addBook(title: String!, authorId: Int!): Book!
    addAuthor(name: String!): Author!
  }
`;
