var express = require("express");
var router = express.Router();

var adminRouter = require("./adminRoutes");
var biodataRouter = require("./biodataRoutes");
var kehadiranRouter = require("./kehadiranRoutes");
var kelulusanRouter = require("./kelulusanRoutes");
var materiRouter = require("./materiRoutes");
var pembayaranRouter = require("./pembayaranRoutes");
var pengumumanRouter = require("./pengumumanRoutes");
var nilaiRouter = require("./nilaiRoutes");
var peraturanRouter = require("./peraturanRoutes");
var soalRouter = require("./soalRoutes");
var validasiRouter = require("./validasiRoutes");

router.use("/", adminRouter);
router.use("/biodata", biodataRouter);
router.use("/kehadiran", kehadiranRouter);
router.use("/kelulusan", kelulusanRouter);
router.use("/materi", materiRouter);
router.use("/pembayaran", pembayaranRouter);
router.use("/pengumuman", pengumumanRouter);
router.use("/penilaian", nilaiRouter);
router.use("/peraturan", peraturanRouter);
router.use("/soal", soalRouter);
router.use("/validasi", validasiRouter);

module.exports = router;
