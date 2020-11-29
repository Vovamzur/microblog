const Message = require("../../resolvers/Message");

it("should return message's replies", async () => {
  const replies = ["reply1", "reply2"];
  const context = {
    prisma: {
      message() {
        return {
          async replies() {
            return replies;
          },
        };
      },
    },
  };

  const messageReplies = await Message.replies({}, undefined, context);

  expect(messageReplies).toBe(replies);
});
