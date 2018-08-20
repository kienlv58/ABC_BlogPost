var express = require("express");
var router = express.Router();

const CategoryController = require("../controllers/CategoryController");
const middleware = require("../middleware/appMiddleware");
// Create Account
router.get("/category",  middleware.isAuthenticated,CategoryController.getCategory);
router.get("/category/:parentId", middleware.isAuthenticated, CategoryController.getSubCategory);
router.get("/category-create/:parentId?", middleware.isAuthenticated, CategoryController.getNewCategory);
router.post("/category-create",  middleware.isAuthenticated,CategoryController.postNewCategory);

module.exports = router;
