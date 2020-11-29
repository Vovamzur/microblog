const Reply = require("../../resolvers/Reply");

it("should return message's replies", async () => {
  const messages = ["message1", "message2"];
  const context = {
    prisma: {
      reply() {
        return {
          async message() {
            return messages;
          },
        };
      },
    },
  };

  const replyMessages = await Reply.message({}, undefined, context);

  expect(replyMessages).toBe(messages);
});
