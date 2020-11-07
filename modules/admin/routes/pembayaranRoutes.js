const express = require("express");
const router = express.Router();
const pembayaranController = require("../controller/pembayaranController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Halaman pembayaran");
});

router.get("/all", pembayaranController.get);
router.post("/upload", pembayaranController.upload);

module.exports = router;
