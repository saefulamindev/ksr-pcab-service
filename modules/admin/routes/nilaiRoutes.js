const express = require("express");
const router = express.Router();
const nilaiController = require("../controller/nilaiController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Halaman penilaian");
});

module.exports = router;
