const express = require("express");
const router = express.Router();
const pembayaranController = require("../controller/pembayaranController");
const passport = require("passport");
const multer = require("multer");

/* GET users listing. */
passport.authenticate("jwt", { session: false }),
  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    function (req, res, next) {
      res.send("Halaman pembayaran");
    }
  );
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  pembayaranController.get
);
passport.authenticate("jwt", { session: false }),
  router.get(
    "/:jenis_bayar/all",
    passport.authenticate("jwt", { session: false }),
    pembayaranController.getByJenisBayar
  );
router.get(
  "/saldo/:jenis_bayar",
  passport.authenticate("jwt", { session: false }),
  pembayaranController.getSaldo
);

router.get(
  "/tagihan/:id_user/:jenis_bayar",
  passport.authenticate("jwt", { session: false }),
  pembayaranController.getTagihan
);
router.post(
  "/upload",
  // passport.authenticate("jwt", { session: false }),
  pembayaranController.tambahTransaksi
);

module.exports = router;
