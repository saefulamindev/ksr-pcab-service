const express = require("express");
const router = express.Router();
const pembayaranController = require("../controller/pembayaranController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Halaman pembayaran");
});

router.get("/all", pembayaranController.get);
router.get("/:jenis_bayar/all", pembayaranController.getByJenisBayar);
router.get("/saldo/:jenis_bayar", pembayaranController.getSaldo);

router.get("/tagihan/:id_user/:jenis_bayar", pembayaranController.getTagihan);
router.post("/upload", pembayaranController.tambahTransaksi);

module.exports = router;
