const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const Reply = require("./resolvers/Reply");
const Message = require("./resolvers/Message");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Reply,
  Message,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => ({
    ...request,
    prisma,
  }),
});

server.start(() => console.log("http://localhost:4000"));

process.on("uncaughtException", (e) => {
  console.error(e);
});

process.on("unhandledRejection", (e) => {
  console.error(e);
});
