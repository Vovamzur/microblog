const { request } = require("graphql-request");

const { startSever } = require("../startServer");

let getHost = () => "";

beforeAll(async () => {
  const app = await startSever();
  const { port } = app.address();

  getHost = () => `http://127.0.0.1:${port}`;
});

it("should returns messages", async () => {});
