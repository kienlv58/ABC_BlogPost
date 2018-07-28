let appRouters = function(app) {
  const loginRouter = require("./auth");
  const dashBoardRouter = require("./dashboard");
  const accountRouter = require("./account");
  const categoryRouter = require("./category");

  app.use("/", dashBoardRouter);
  app.use("/", loginRouter);
  app.use("/", accountRouter);
  app.use("/", categoryRouter);
};
module.exports = appRouters;
