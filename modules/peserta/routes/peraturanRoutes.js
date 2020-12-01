const express = require("express");
const peraturanController = require("../controller/peraturanController");
const router = express.Router();
const passport = require("passport");

/* GET users listing. */
router.get(
  "/",
  //   passport.authenticate("jwt", { session: false }),
  peraturanController.get
);

module.exports = router;
