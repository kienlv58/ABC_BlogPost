exports.getCategory = (req, res, next) => {
  try {
    res.render("category/index");
  } catch (e) {}
};
