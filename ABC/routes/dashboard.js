var express = require("express");
var router = express.Router();
const middleware = require("../middleware/appMiddleware");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "ABC" });
});

module.exports = router;
