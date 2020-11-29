const { startSever } = require("./startServer");

startSever();

process.on("uncaughtException", (e) => {
  console.error(e);
});

process.on("unhandledRejection", (e) => {
  console.error(e);
});
