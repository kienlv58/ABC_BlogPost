var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var logger = require("morgan");
var expressValidator = require("express-validator");
var flash = require("express-flash");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var appRouters = require("./routes/index");
var passport = require("passport");

/**
 * Read .env
 */
dotenv.config({ path: "./env/.env" });

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressValidator());

// Use session
var sessionMiddleware = session({
  resave: true,
  rolling: true,
  saveUninitialized: false,
  secret: process.env.SECRET, // realtime chat system
  cookie: { maxAge: parseInt(process.env.SESSION_EXP) },
  store: new MongoStore({
    url: process.env.MONGO_DB,
    autoReconnect: true
  })
});
app.use(sessionMiddleware);
app.use(flash());

appRouters(app);

//conect to mongodb
mongoose
  .connect(
    process.env.MONGO_DB,
    { useNewUrlParser: true },
    function(err) {
      if (err) {
        console.log("error connect db", err);
      } else {
        console.log("Mongo database is connected");
      }
    }
  )
  .catch(e => {
    console.log("exception:  ", e);
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Pass user login to client
app.use((req, res, next) => {
  // Allow request from all domain
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.locals.account = req.session.account;
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
