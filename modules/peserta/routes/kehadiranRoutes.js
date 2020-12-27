const express = require("express");
const router = express.Router();
const kehadiranController = require("../controller/kehadiranController");
const passport = require("passport");

/* GET users listing. */
router.get(
  "/:id",
  //   passport.authenticate("jwt", { session: false }),
  kehadiranController.getUser
);

module.exports = router;
