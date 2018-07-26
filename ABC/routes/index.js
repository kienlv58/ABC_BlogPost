let appRouters = function(app) {
  const loginRouter = require("./auth");
  const dashBoardRouter = require("./dashboard");

  app.use("/", dashBoardRouter);
  app.use("/login", loginRouter);
};
module.exports = appRouters;
