const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/uploads", function (req, res, next) {
  res.send("Dashboard Upload");
});

module.exports = router;
