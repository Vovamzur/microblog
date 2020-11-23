async function messages(parent, args, context) {
  const where = args.filter ? { text_contains: args.filter } : {};

  const params = {
    where,
    skip: args.skip,
    first: args.first,
    ...(args.orderBy === "empty" ? {} : { orderBy: args.orderBy }),
  };

  const messageList = await context.prisma.messages(params);

  const count = await context.prisma
    .messagesConnection({ where })
    .aggregate()
    .count();

  return { messageList, count };
}

module.exports = {
  messages,
};
