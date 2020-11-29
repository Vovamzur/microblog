const Message = require("../../resolvers/Message");

let context;

const REPLIES = ["reply1", "reply2"];

beforeAll(() => {
  context = {
    prisma: {
      message() {
        return {
          async replies() {
            return REPLIES;
          },
        };
      },
    },
  };
});

it("should return message's replies", async () => {
  const messageReplies = await Message.replies({}, undefined, context);

  expect(messageReplies).toBe(REPLIES);
});
