function newMessageSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.message({
    mutation_in: ['CREATED']
  }).node();
};

function updateMessageSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.message({
    mutation_in: ['UPDATED']
  }).node();
}

function updateReplySubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.reply({
    mutation_in: ['UPDATED']
  }).node();
}

const newMessage = {
  subscribe: newMessageSubscribe,
  resolve: payload => payload
};

const updatedMessage = {
  subscribe: updateMessageSubscribe,
  resolve: payload => payload
};

const updatedReply = {
  subscribe: updateReplySubscribe,
  resolve: payload => payload
}

module.exports = {
  newMessage,
  updatedMessage,
  updatedReply
}