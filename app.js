require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("./config/passport");
const multer = require("multer");

const file_form_pendaftaran = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images/file_form_pendaftaran");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime + "-" + file.originalname);
  },
});

const file_bukti_bayar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images/file_bukti_bayar");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "file_form_pendaftaran/png" ||
    file.mimetype === "file_form_pendaftaran/jpg" ||
    file.mimetype === "file_form_pendaftaran/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const filterBuktiBayar = (req, file, cb) => {
  if (
    file.mimetype === "bukti_bayar/png" ||
    file.mimetype === "bukti_bayar/jpg" ||
    file.mimetype === "bukti_bayar/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var routers = require("./routes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport);

app.use(
  multer({
    storage: file_form_pendaftaran,
    fileFilter: fileFilter,
  }).single("file_form_pendaftaran")
);
app.use(
  multer({
    storage: file_bukti_bayar,
    fileFilter: filterBuktiBayar,
  }).single("bukti_bayar")
);

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
  res.render("error");
});

module.exports = app;
