const express = require("express");
const profilController = require("../controller/profilController");
const router = express.Router();
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
// router.get(
//   "/",
//   //   passport.authenticate("jwt", { session: false }),
//   biodataController.get
// );

router.get("/:id_user", reqAuth, profilController.getByIdUser);

module.exports = router;
