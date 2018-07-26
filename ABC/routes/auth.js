var express = require("express");
var router = express.Router();

const AuthController = require("../controllers/AuthController");
/* GET login page. */
router.get("/", AuthController.getLogin);

module.exports = router;
