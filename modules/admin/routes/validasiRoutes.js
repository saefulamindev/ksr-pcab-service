const express = require("express");
const router = express.Router();
const validasiController = require("../controller/validasiController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Halaman validasi");
});

router.get("/dokumen/all", reqAuth, validasiController.getDok);

router.post("/dokumen/edit/:id_user", reqAuth, validasiController.updateDok);

router.get("/transaksi/all", reqAuth, validasiController.get);

router.get("/transaksi/:id_user", reqAuth, validasiController.getById);

router.post("/transaksi/edit/:id", reqAuth, validasiController.updateTransaksi);

module.exports = router;
