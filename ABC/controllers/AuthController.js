const AccountModel = require("../models/Account");

exports.getLogin = (req, res, next) => {
  try {
    res.render("auth/login");
  } catch (e) {}
};
exports.getLogout = (req, res, next) => {
  req.session.cookie.maxAge = 0;
    req.session.destroy();
    res.redirect('/admin/login');
};

exports.postLogin = (req, res, next) => {
  try {
    AccountModel.findOne({
      userName: req.body.accountName
    }).exec((err, account) => {
      if (err) {
        console.log("error1---", err);
        return res.redirect("admin/login");
      }
      if (!account) {
        req.flash("errors", "Authentication failed. account not found.");
        console.log("erro2---", "cant found account");
        return res.redirect("/admin/login");
      } else {
        // check if password matches
        account.comparePassword(req.body.password, (err, isMatch) => {
          if (err) {
            console.log("error3---", err);
            req.flash("errors", "An error happened");
            return res.redirect("/admin/login");
          }
          if (isMatch) {
            req.session.account = account;
            if (req.body.remember) {
              req.session.remember = true;
              req.session.cookie.maxAge = parseInt(process.env.SESSION_EXP);
            }

            res.redirect(req.session.redirectTo || "/admin");
          } else {
            console.log("error4---", "not matched");
            return res.redirect("/admin/login");
          }
        });
      }
    });
  } catch (e) {
    next(e);
  }
};
