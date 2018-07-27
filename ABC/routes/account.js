var express = require("express");
var router = express.Router();

const AccountController = require("../controllers/AccountController");
const middleware = require("../middleware/appMiddleware");
// Create Account
router.post("/account", AccountController.createAccount);

module.exports = router;
