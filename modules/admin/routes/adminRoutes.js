const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Dashboard");
});

router.get("/tahap/:tahap", reqAuth, adminController.countUser);

router.post("/tahap/edit/:id", reqAuth, adminController.updateTahap);

module.exports = router;
