const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Dashboard");
});

router.get("/tahap/:tahap", adminController.countUser);

module.exports = router;
