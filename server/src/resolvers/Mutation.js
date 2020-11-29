function postMessage(parent, args, context, info) {
  return context.prisma.createMessage({
    text: args.text,
    likes: 0,
    dislikes: 0,
  });
}

async function postReply(parent, args, context, info) {
  const messageExists = await context.prisma.$exists.message({
    id: args.messageId,
  });

  if (!messageExists) {
    throw new Error(`Message with ID ${args.messageId} does not exist`);
  }

  return context.prisma.createReply({
    text: args.text,
    likes: 0,
    dislikes: 0,
    message: { connect: { id: args.messageId } },
  });
}

async function addLikeToMessage(parent, args, context, info) {
  const message = await context.prisma.message({ id: args.messageId });

  if (!message) {
    throw new Error(`Message with ID ${args.messageId} does not exist`);
  }

  return context.prisma.updateMessage({
    data: {
      likes: message.likes + 1,
    },
    where: {
      id: args.messageId,
    },
  });
}

async function addDislikeToMessage(parent, args, context, info) {
  const message = await context.prisma.message({ id: args.messageId });

  if (!message) {
    throw new Error(`Message with ID ${args.messageId} does not exist`);
  }

  return context.prisma.updateMessage({
    data: {
      dislikes: message.dislikes + 1,
    },
    where: {
      id: args.messageId,
    },
  });
}

async function addLikeToReply(parent, args, context, info) {
  const reply = await context.prisma.reply({ id: args.replyId });

  if (!reply) {
    throw new Error(`Reply with ID ${args.replyId} does not exist`);
  }

  return context.prisma.updateReply({
    data: {
      likes: reply.likes + 1,
    },
    where: {
      id: args.replyId,
    },
  });
}

async function addDislikeToReply(parent, args, context, info) {
  const reply = await context.prisma.reply({ id: args.replyId });

  if (!reply) {
    throw new Error(`Reply with ID ${args.replyId} does not exist`);
  }

  return context.prisma.updateReply({
    data: {
      dislikes: reply.dislikes + 1,
    },
    where: {
      id: args.replyId,
    },
  });
}

module.exports = {
  postMessage,
  postReply,
  addLikeToMessage,
  addDislikeToMessage,
  addLikeToReply,
  addDislikeToReply,
};
