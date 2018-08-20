var express = require("express");
var router = express.Router();

const AuthController = require("../controllers/AuthController");
const middleware = require("../middleware/appMiddleware");
/* GET login page. */
// router.get("/login",middleware.isAuthenticated, AuthController.getLogin);
router.get("/login", AuthController.getLogin);
router.post("/login", AuthController.postLogin);
router.get("/logout", middleware.isAuthenticated, AuthController.getLogout);

module.exports = router;
