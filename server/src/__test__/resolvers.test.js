const { request } = require("graphql-request");

const { startSever } = require("../startServer");

/** @type {Server} */
let appServer;

/** @type {() => string} */
let getHost = () => "";

/** @type {import("../generated/prisma-client").Prisma} */
let prisma;

beforeAll(async () => {
  const { app, server } = await startSever();
  const { port } = app.address();

  appServer = app;
  prisma = server.context({}).prisma;
  getHost = () => `http://127.0.0.1:${port}`;
});

afterAll(async () => {
  appServer.close();
});

const generateMessageQuery = ({ orderBy, filter, skip, first }) => `
query {
  messages(orderBy: ${orderBy}, filter: "${filter}", skip: ${skip}, first: ${first}) {
    count
    messageList {
      id
      text
      likes
      dislikes
      replies {
        id
        text
        likes
        dislikes
      }
    }
  }
}
`;

it("should returns messages", async () => {
  const orderBy = "empty";
  const filter = "a";
  const skip = 0;
  const first = 1;
  const query = generateMessageQuery({
    orderBy,
    filter,
    skip,
    first,
  });

  const response = await request(getHost(), query);

  const { count, messageList } = response.messages;
  expect(typeof count).toBe("number");
  expect(Array.isArray(messageList)).toBe(true);
});

const generatePostMessageMutation = ({ text }) => `
mutation {
  postMessage(text: "${text}") {
    id
    text
    likes
    dislikes
    replies {
      id
      text
      likes
      dislikes
    }
  }
}`;

it("should create message", async () => {
  const text = "text";
  const mutation = generatePostMessageMutation({ text });

  const response = await request(getHost(), mutation);

  const responseData = response.postMessage;
  expect(typeof responseData).toBe("object");
  expect(responseData).toHaveProperty("id");
  expect(responseData.text).toBe(text);
});

const generatePostReplyMutation = ({ messageId, text }) => `
mutation {
  postReply(messageId: "${messageId}", text: "${text}") {
    id
    text
    likes
    dislikes
  }
}
`;

it("should create reply", async () => {
  const text = "reply text";
  const [{ id: messageId }] = await prisma.messages();
  const mutation = generatePostReplyMutation({ messageId, text });

  const response = await request(getHost(), mutation);

  const responseData = response.postReply;
  expect(typeof responseData).toBe("object");
  expect(responseData).toHaveProperty("id");
  expect(responseData.text).toBe(text);
});

const generatePostLikeMutation = ({ messageId }) => `
mutation {
  addLikeToMessage(messageId: "${messageId}") {
    id
    text
    likes
    dislikes
  }
}
`;

it("should add like to message", async () => {
  const [{ id: messageId, likes }] = await prisma.messages();
  const mutation = generatePostLikeMutation({ messageId });

  const response = await request(getHost(), mutation);

  const responseData = response.addLikeToMessage;
  expect(typeof responseData).toBe("object");
  expect(responseData).toHaveProperty("id");
  expect(responseData.likes).toBe(likes + 1);
});

const generatePostDislikeMutation = ({ messageId }) => `
mutation {
  addDislikeToMessage(messageId: "${messageId}") {
    id
    text
    likes
    dislikes
  }
}
`;

it("should add dislike to message", async () => {
  const [{ id: messageId, dislikes }] = await prisma.messages();
  const mutation = generatePostDislikeMutation({ messageId });

  const response = await request(getHost(), mutation);

  const responseData = response.addDislikeToMessage;
  expect(typeof responseData).toBe("object");
  expect(responseData).toHaveProperty("id");
  expect(responseData.dislikes).toBe(dislikes + 1);
});

const generatePostReplyLikeMutation = ({ replyId }) => `
mutation {
  addLikeToReply(replyId: "${replyId}") {
    id
    text
    likes
    dislikes
  }
}
`;

it("should add like to reply", async () => {
  const [{ id: replyId, likes }] = await prisma.replies();
  const mutation = generatePostReplyLikeMutation({ replyId });

  const response = await request(getHost(), mutation);

  const responseData = response.addLikeToReply;
  expect(typeof responseData).toBe("object");
  expect(responseData).toHaveProperty("id");
  expect(responseData.likes).toBe(likes + 1);
});

const generatePostReplyDislikeMutation = ({ replyId }) => `
mutation {
  addDislikeToReply(replyId: "${replyId}") {
    id
    text
    likes
    dislikes
  }
}
`;

it("should add like to reply", async () => {
  const [{ id: replyId, dislikes }] = await prisma.replies();
  const mutation = generatePostReplyDislikeMutation({ replyId });

  const response = await request(getHost(), mutation);

  const responseData = response.addDislikeToReply;
  expect(typeof responseData).toBe("object");
  expect(responseData).toHaveProperty("id");
  expect(responseData.dislikes).toBe(dislikes + 1);
});
