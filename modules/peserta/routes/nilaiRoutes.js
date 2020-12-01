const express = require("express");
const nilaiController = require("../controller/nilaiController");
const router = express.Router();
const passport = require("passport");

/* GET users listing. */
router.get(
  "/",
  //   passport.authenticate("jwt", { session: false }),
  nilaiController.get
);

router.get(
  "/:id",
  //   passport.authenticate("jwt", { session: false }),
  nilaiController.getById
);

module.exports = router;
