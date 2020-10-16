const express = require("express");
const router = express.Router();
const UserController = require("./user-controller");
const passport = require("passport");

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("User API");
// });

router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  UserController.getUser
);
router.post("/login", UserController.login);

module.exports = router;
