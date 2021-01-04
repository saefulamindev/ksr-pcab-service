const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();
const passport = require("passport");

/* GET users listing. */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.send("Dashboard");
  }
);

router.get(
  "/tahap/:tahap",
  passport.authenticate("jwt", { session: false }),
  adminController.countUser
);
router.post(
  "/tahap/edit/:id",
  // passport.authenticate("jwt", { session: false }),
  adminController.updateTahap
);

module.exports = router;
