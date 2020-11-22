function message(parent, args, context) {
  return context.prisma.reply({
    id: parent.id
  }).message()
}

module.exports = {
  message
}