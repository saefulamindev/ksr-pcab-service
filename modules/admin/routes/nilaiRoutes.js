const express = require("express");
const router = express.Router();
const nilaiController = require("../controller/nilaiController");
const passport = require("passport");

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  res.send("Halaman penilaian");
});
// Nilai Fisik
router.get(
  "/fisik/all",
  passport.authenticate("jwt", { session: false }),
  nilaiController.getFisik
);
router.post(
  "/fisik/edit/:id_user",
  passport.authenticate("jwt", { session: false }),
  nilaiController.updateFisik
);

// Nilai Afektif
router.get(
  "/afektif/all",
  passport.authenticate("jwt", { session: false }),
  nilaiController.getAfektif
);
router.post(
  "/afektif/tambah",
  passport.authenticate("jwt", { session: false }),
  nilaiController.createAfektif
);
router.post(
  "/afektif/edit/:id_user",
  passport.authenticate("jwt", { session: false }),
  nilaiController.updateAfektif
);
router.post(
  "/afektif/hapus/:id_user",
  passport.authenticate("jwt", { session: false }),
  nilaiController.deleteAfektif
);

module.exports = router;
