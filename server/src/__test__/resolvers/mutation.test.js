const Mutation = require("../../resolvers/Mutation");

let context;

beforeEach(() => {
  context = {
    prisma: {
      $exists: {},
    },
  };
});

it("should post message", async () => {
  const messageText = "message text";
  const createMessageMock = jest.fn(() => {});
  context.prisma.createMessage = createMessageMock;

  await Mutation.postMessage(undefined, { text: messageText }, context);

  const mockArgs = createMessageMock.mock.calls[0][0];
  expect(mockArgs.text).toBe(messageText);
  expect(mockArgs.likes).toBe(0);
  expect(mockArgs.dislikes).toBe(0);
});

it("should post message reply", async () => {
  const replyText = "reply text";
  const messageId = 100500;
  const messageExistsMock = jest.fn(() => true);
  context.prisma.$exists.message = messageExistsMock;
  const postReplyMock = jest.fn();
  context.prisma.createReply = postReplyMock;

  const newReply = { text: replyText, messageId };
  await Mutation.postReply(undefined, newReply, context);

  const postReplyMockArgs = postReplyMock.mock.calls[0][0];
  expect(postReplyMockArgs.text).toBe(replyText);
  expect(postReplyMockArgs.likes).toBe(0);
  expect(postReplyMockArgs.dislikes).toBe(0);
  expect(postReplyMockArgs.message.connect.id).toBe(messageId);
});

it("should add like to message", async () => {
  const startLikesCount = 21;
  const messageId = 123123;
  const args = { messageId };
  const message = { likes: startLikesCount };
  const messageMock = jest.fn().mockResolvedValue(message);
  context.prisma.message = messageMock;
  const updateMessageMock = jest.fn();
  context.prisma.updateMessage = updateMessageMock;

  await Mutation.addLikeToMessage(undefined, args, context);

  const updateMessageMockArgs = updateMessageMock.mock.calls[0][0];
  expect(updateMessageMockArgs.data.likes).toBe(startLikesCount + 1);
  expect(updateMessageMockArgs.where.id).toBe(messageId);
});

it("should add dislike to message", async () => {
  const startDislikesCount = 21;
  const messageId = 123123;
  const args = { messageId };
  const message = { dislikes: startDislikesCount };
  const messageMock = jest.fn().mockResolvedValue(message);
  context.prisma.message = messageMock;
  const updateMessageMock = jest.fn();
  context.prisma.updateMessage = updateMessageMock;

  await Mutation.addDislikeToMessage(undefined, args, context);

  const updateMessageMockArgs = updateMessageMock.mock.calls[0][0];
  expect(updateMessageMockArgs.data.dislikes).toBe(startDislikesCount + 1);
  expect(updateMessageMockArgs.where.id).toBe(messageId);
});

it("should add like to message's reply", async () => {
  const startLikesCount = 21;
  const replyId = 123123;
  const args = { replyId };
  const reply = { likes: startLikesCount };
  const replyMock = jest.fn().mockResolvedValue(reply);
  context.prisma.reply = replyMock;
  const updateReplyMock = jest.fn();
  context.prisma.updateReply = updateReplyMock;

  await Mutation.addLikeToReply(undefined, args, context);

  const updateReplyMockArgs = updateReplyMock.mock.calls[0][0];
  expect(updateReplyMockArgs.data.likes).toBe(startLikesCount + 1);
  expect(updateReplyMockArgs.where.id).toBe(replyId);
});

it("should add dislike to message's reply", async () => {
  const startDislikesCount = 21;
  const replyId = 123123;
  const args = { replyId };
  const reply = { dislikes: startDislikesCount };
  const replyMock = jest.fn().mockResolvedValue(reply);
  context.prisma.reply = replyMock;
  const updateReplyMock = jest.fn();
  context.prisma.updateReply = updateReplyMock;

  await Mutation.addDislikeToReply(undefined, args, context);

  const updateReplyMockArgs = updateReplyMock.mock.calls[0][0];
  expect(updateReplyMockArgs.data.dislikes).toBe(startDislikesCount + 1);
  expect(updateReplyMockArgs.where.id).toBe(replyId);
});
