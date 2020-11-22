function replies(parent, args, context) {
  return context.prisma.message({
    id: parent.id
  }).replies();
}

module.exports = {
  replies
}