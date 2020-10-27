const express = require("express");
const router = express.Router();
const validasiController = require("../controller/validasiController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Halaman validasi");
});

router.get("/dokumen/all", validasiController.getDok);
router.get("/bayar/all", validasiController.get);

module.exports = router;
