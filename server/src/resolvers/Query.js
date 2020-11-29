async function messages(parent, args, context) {
  const params = {
    where: args.filter ? { text_contains: args.filter } : {},
    ...(args.skip !== undefined ? { skip: args.skip } : {}),
    ...(args.first !== undefined ? { first: args.first } : {}),
    ...(args.orderBy !== "empty" ? { orderBy: args.orderBy } : {}),
  };

  const messageList = await context.prisma.messages(params);
  const count = await context.prisma
    .messagesConnection({ where: params.where })
    .aggregate()
    .count();

  return { messageList, count };
}

module.exports = {
  messages,
};
