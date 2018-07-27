const AccountModel = require("./../models/Account");
const publicUrl = "/login";

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.session.account) {
    req.session.touch();

    if (req.session.remember) {
      req.session.cookie.maxAge = parseInt(process.env.SESSION_EXP);
    }

    return next();
  }

  let accessRouter = req.originalUrl;

  req.session.redirectTo = accessRouter;
  return res.redirect(publicUrl);
};
