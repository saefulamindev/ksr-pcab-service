const express = require("express");
const router = express.Router();
const materiController = require("../controller/materiController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Halaman materi diklat");
});

module.exports = router;
