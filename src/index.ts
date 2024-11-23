import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { AppDataSource } from "./config/database";
import { typeDefs } from "./schema";
import { authorResolver } from "./resolvers/authorResolver";
import { bookResolver } from "./resolvers/bookResolver";

const resolvers = {
    Query: {
        ...authorResolver.Query,
        ...bookResolver.Query,
    },
    Mutation: {
        ...authorResolver.Mutation,
        ...bookResolver.Mutation,
    },
};

const startServer = async () => {
    await AppDataSource.initialize();

    const server = new ApolloServer({ typeDefs, resolvers });

    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
};

startServer();
