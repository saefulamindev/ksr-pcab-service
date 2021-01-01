const express = require("express");
const uploadController = require("../controller/uploadController");
const router = express.Router();
const passport = require("passport");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Dashboard Upload");
});

router.post("/bukti-bayar", uploadController.uploadBuktiBayar);

module.exports = router;
