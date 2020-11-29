const path = require("path");
const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const { importSchema } = require("graphql-import");
const resolvers = require("./resolvers");

async function startSever() {
  const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
  const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: (request) => ({
      ...request,
      prisma,
    }),
  });

  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  console.log("Server is running on http://localhost:4000");

  return app;
}

module.exports = {
  startSever,
};
