const express = require("express");
const router = express.Router();
const validasiController = require("../controller/validasiController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Halaman validasi");
});

router.get("/dokumen/all", validasiController.getDok);
router.post("/dokumen/edit/:id_user", validasiController.updateDok);
router.get("/bayar/all", validasiController.get);
router.post("/bayar/edit/:id", validasiController.updateBayar);

module.exports = router;
