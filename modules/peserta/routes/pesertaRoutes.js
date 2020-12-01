const express = require("express");
const pesertaController = require("../controller/pesertaController");
const router = express.Router();
const passport = require("passport");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Dashboard Peserta");
});

module.exports = router;
