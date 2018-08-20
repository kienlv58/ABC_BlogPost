let appRouters = function(app) {
  const loginRouter = require("./auth");
  const dashBoardRouter = require("./dashboard");
  const accountRouter = require("./account");
  const categoryRouter = require("./category");

  app.use("/admin", dashBoardRouter);
  app.use("/admin", loginRouter);
  app.use("/admin", accountRouter);
  app.use("/admin", categoryRouter);
};
module.exports = appRouters;
