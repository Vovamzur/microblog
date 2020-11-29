const Query = require("../../resolvers/Query");

let context;

const MESSAGE_COUNT = 12;

beforeEach(() => {
  context = {
    prisma: {},
  };
  const aggregateMock = jest.fn(() => ({ count: () => MESSAGE_COUNT }));
  const messagesConnectionMock = jest.fn(() => ({ aggregate: aggregateMock }));
  context.prisma.messagesConnection = messagesConnectionMock;
});

it("should return count property", async () => {
  context.prisma.messages = jest.fn();

  const result = await Query.messages(undefined, {}, context);

  expect(result.count).toBe(MESSAGE_COUNT);
});

it("should return messageList property", async () => {
  const messages = Array(12).map((_, index) => String(index));
  const messagesMock = jest.fn().mockResolvedValue(messages);
  context.prisma.messages = messagesMock;

  const result = await Query.messages(undefined, {}, context);

  expect(result.messageList).toBe(messages);
});

it("should return first 10 messages", async () => {
  const requestedCount = 10;
  const messagesMock = jest.fn();
  context.prisma.messages = messagesMock;

  await Query.messages(undefined, { first: requestedCount }, context);

  const messagesMockArgs = messagesMock.mock.calls[0][0];
  expect(messagesMockArgs.first).toBe(requestedCount);
});

it("should return messages that contains some text", async () => {
  const filter = "substring";
  const messagesMock = jest.fn();
  context.prisma.messages = messagesMock;

  await Query.messages(undefined, { filter }, context);

  const messagesMockArgs = messagesMock.mock.calls[0][0];
  expect(messagesMockArgs.where.text_contains).toBe(filter);
});

it("should return 10 messages of second page", async () => {
  const requestedCount = 10;
  const pageCount = 2;
  const skip = requestedCount * pageCount;
  const messagesMock = jest.fn();
  context.prisma.messages = messagesMock;

  await Query.messages(undefined, { first: requestedCount, skip }, context);

  const messagesMockArgs = messagesMock.mock.calls[0][0];
  expect(messagesMockArgs.first).toBe(requestedCount);
  expect(messagesMockArgs.skip).toBe(skip);
});

it("should apply orderBy filter", async () => {
  const orderBy = "createdAt_DESC";
  const messagesMock = jest.fn();
  context.prisma.messages = messagesMock;

  await Query.messages(undefined, { orderBy }, context);

  const messagesMockArgs = messagesMock.mock.calls[0][0];
  expect(messagesMockArgs.orderBy).toBe(orderBy);
});
