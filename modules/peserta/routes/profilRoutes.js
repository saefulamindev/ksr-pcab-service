const express = require("express");
const profilController = require("../controller/profilController");
const router = express.Router();
const passport = require("passport");

/* GET users listing. */
// router.get(
//   "/",
//   //   passport.authenticate("jwt", { session: false }),
//   biodataController.get
// );

router.get(
  "/:id",
  //   passport.authenticate("jwt", { session: false }),
  profilController.getById
);

module.exports = router;
