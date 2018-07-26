exports.getLogin = (req, res, next) => {
  try {
    res.render("auth/login");
  } catch (e) {}
};
