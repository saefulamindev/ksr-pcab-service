var express = require('express');
var router = express.Router();

var adminRouter = require("./adminRoutes");
var biodataRouter = require("./biodataRoutes");
var kehadiranRouter = require("./kehadiranRoutes");
var kelulusanRouter = require("./kelulusanRoutes");
var materidiklatRouter = require("./materidiklatRoutes");
var pembayaranRouter = require("./pembayaranRoutes");
var pengumumanRouter = require("./pengumumanRoutes");
var penilaianRouter = require("./penilaianRoutes");
var peraturanRouter = require("./peraturanRoutes");
var soalRouter = require("./soalRoutes");
var validasiRouter = require("./validasiRoutes");

router.use("/", adminRouter);
router.use("/biodata", biodataRouter);
router.use("/kehadiran", kehadiranRouter);
router.use("/kelulusan", kelulusanRouter);
router.use("/materidiklat", materidiklatRouter);
router.use("/pembayaran", pembayaranRouter);
router.use("/pengumuman", pengumumanRouter);
router.use("/penilaian", penilaianRouter);
router.use("/peraturan", peraturanRouter);
router.use("/soal", soalRouter);
router.use("/validasi", validasiRouter);

module.exports = router;