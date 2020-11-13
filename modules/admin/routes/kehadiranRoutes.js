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
  "/materi/:id_materi/:id_user",
  passport.authenticate("jwt", { session: false }),
  kehadiranController.UpdateByM
);

router.get(
  "/peserta/all",
  passport.authenticate("jwt", { session: false }),
  kehadiranController.getUser
);
router.get(
  "/peserta/:id_user",
  passport.authenticate("jwt", { session: false }),
  kehadiranController.getDetailUser
);
router.post(
  "/peserta/:id_user/:id_materi",
  passport.authenticate("jwt", { session: false }),
  kehadiranController.updateHadirByUser
);

module.exports = router;
