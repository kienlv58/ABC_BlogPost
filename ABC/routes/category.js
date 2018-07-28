var express = require("express");
var router = express.Router();

const CategoryController = require("../controllers/CategoryController");
const middleware = require("../middleware/appMiddleware");
// Create Account
router.get("/category", CategoryController.getCategory);

module.exports = router;
