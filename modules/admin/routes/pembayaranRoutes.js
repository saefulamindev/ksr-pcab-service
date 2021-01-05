const express = require("express");
const router = express.Router();
const pembayaranController = require("../controller/pembayaranController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");
const multer = require("multer");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Halaman pembayaran");
});
router.get("/all", reqAuth, pembayaranController.get);

router.get("/:jenis_bayar/all", reqAuth, pembayaranController.getByJenisBayar);

router.get("/saldo/:jenis_bayar", reqAuth, pembayaranController.getSaldo);

router.get(
  "/tagihan/:id_user/:jenis_bayar",
  reqAuth,
  pembayaranController.getTagihan
);
// router.post("/upload", reqAuth, pembayaranController.tambahTransaksi);

module.exports = router;
