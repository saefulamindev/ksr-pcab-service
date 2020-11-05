const express = require("express");
const router = express.Router();
const kehadiranController = require("../controller/kehadiranController");
const passport = require("passport");

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  res.send("Halaman Kehadiran");
});
router.get(
  "/materi/all",
  passport.authenticate("jwt", { session: false }),
  kehadiranController.getAll
);
router.get(
  "/materi/:id_materi",
  passport.authenticate("jwt", { session: false }),
  kehadiranController.getDetail
);
router.post(
  "/materi/:id_user",
  passport.authenticate("jwt", { session: false }),
  kehadiranController.Update
);

router.get(
  "/peserta/all",
  // passport.authenticate("jwt", { session: false }),
  kehadiranController.getUser
);

module.exports = router;
