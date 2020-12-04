const express = require("express");
const pengumumanController = require("../controller/pengumumanController");
const router = express.Router();
const passport = require("passport");

/* GET users listing. */
router.get(
  "/",
  //   passport.authenticate("jwt", { session: false }),
  pengumumanController.get
);

module.exports = router;
