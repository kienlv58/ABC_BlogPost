var express = require("express");
var router = express.Router();

const CategoryController = require("../controllers/CategoryController");
const middleware = require("../middleware/appMiddleware");
// Create Account
router.get("/category", CategoryController.getCategory);
router.get("/category/:parentId", CategoryController.getSubCategory);
router.get("/category-create/:parentId?", CategoryController.getNewCategory);
router.post("/category-create", CategoryController.postNewCategory);

module.exports = router;
