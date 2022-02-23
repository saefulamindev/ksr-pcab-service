require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require('cors')
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("./config/passport");

var routers = require("./routes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport);

app.use(routers);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    meta: {
      message: err.message,
      status: "error",
      code: err.status || 500,
    },
  });
});

module.exports = app;
