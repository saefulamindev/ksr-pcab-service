const express = require("express");
const router = express.Router();
const kelulusanController = require("../controller/kelulusanController");
const passport = require("passport");

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  res.send("Halaman Kelulusan");
});
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  kelulusanController.get
);
router.post(
  "/edit/:id_user",
  passport.authenticate("jwt", { session: false }),
  kelulusanController.update
);

module.exports = router;
