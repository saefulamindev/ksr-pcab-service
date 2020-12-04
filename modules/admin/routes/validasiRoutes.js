const express = require("express");
const router = express.Router();
const validasiController = require("../controller/validasiController");
const passport = require("passport");

/* GET users listing. */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.send("Halaman validasi");
  }
);

router.get(
  "/dokumen/all",
  passport.authenticate("jwt", { session: false }),
  validasiController.getDok
);
router.post(
  "/dokumen/edit/:id_user",
  passport.authenticate("jwt", { session: false }),
  validasiController.updateDok
);
router.get(
  "/bayar/all",
  passport.authenticate("jwt", { session: false }),
  validasiController.get
);
router.post(
  "/bayar/edit/:id",
  passport.authenticate("jwt", { session: false }),
  validasiController.updateBayar
);
router.post("/:jenis_bayar/:id_user", validasiController.ubahValidasi);

module.exports = router;
