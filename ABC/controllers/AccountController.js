const AccountModel = require("../models/Account");

exports.getRegister = (req, res, next) => {
  res.render("auth/register", {
    title: "Register"
  });
};

exports.createAccount = (req, res, next) => {
  console.log("body---------", req.body);
  req.checkBody("displayName", "Display name is not empty").notEmpty();
  req.checkBody("userName", "Display name is not empty").notEmpty();
  req.checkBody("password", "Display name is not empty").notEmpty();
  req.checkBody("private_code", "Display name is not empty").notEmpty();
  req.getValidationResult().then(function(errors) {
    if (!errors.isEmpty()) {
      var errors = errors.mapped();

      res.render("auth/register", {
        title: "Register",
        errors: errors,
        data: req.body
      });
    }
    if (req.body.private_code !== "kien1234") {
      res.render("auth/register", {
        title: "Register",
        errors: "private code incorrect"
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
        return res.redirect("/admin/login");
      });
    }
  });
};
