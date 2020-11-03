const express = require("express");
const router = express.Router();
const biodataController = require("../controller/biodataController");
const passport = require("passport");

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  res.send("Halaman Biodata");
});
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  biodataController.get
);
router.get(
  "/:id_user",
  passport.authenticate("jwt", { session: false }),
  biodataController.getById
);

module.exports = router;
