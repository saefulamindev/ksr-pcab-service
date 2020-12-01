const express = require("express");
const router = express.Router();
const UserController = require("./userController");
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
router.get("/daftar", UserController.token_daftar);
router.post("/daftar", UserController.daftar);
router.get("/verify?:token_email", UserController.verify);

module.exports = router;
