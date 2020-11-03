const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();
const passport = require("passport");

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  res.send("Dashboard");
});

router.get(
  "/tahap/:tahap",
  passport.authenticate("jwt", { session: false }),
  adminController.countUser
);

module.exports = router;
