let appRouters = function(app) {
  const loginRouter = require("./auth");
  const dashBoardRouter = require("./dashboard");
  const accountRouter = require("./account");

  app.use("/", dashBoardRouter);
  app.use("/", loginRouter);
  app.use("/", accountRouter);
};
module.exports = appRouters;
