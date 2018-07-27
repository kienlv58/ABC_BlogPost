const AccountModel = require("../models/Account");

exports.createAccount = (req, res, next) => {
  req.checkBody("displayName", "Display name is not empty").notEmpty();
  req.getValidationResult().then(function(errors) {
    if (!errors.isEmpty()) {
      var errors = errors.mapped();

      res.render("auth/login", {
        title: "Register",
        errors: errors,
        data: req.body
      });
    } else {
      let accountData = {
        userName: req.body.userName || null,
        password: req.body.password || null,
        displayName: req.body.displayName || null,
        role: req.body.role || "Contributor",
        avatar: req.body.avatar || null,
        email: req.body.email || null,
        facebookID: req.body.facebookID || null,
        googleID: req.body.googleID || null
      };
      AccountModel.create(accountData, (err, result) => {
        if (err) {
          req.flash("errors", "Some errors. Try again");
          return res.redirect("/login");
        }
        req.flash("success", "Create account successfully");
        return res.redirect("/login");
      });
    }
  });
};
