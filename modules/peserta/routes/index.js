var express = require("express");
var router = express.Router();

var pesertaRouter = require("./pesertaRoutes");
var uploadRouter = require("./uploadRoutes");
var peraturanRouter = require("./peraturanRoutes");
var nilaiRouter = require("./nilaiRoutes");
var pengumumanRouter = require("./pengumumanRoutes");
var profilRouter = require("./profilRoutes");
var kehadiranRouter = require("./kehadiranRoutes");
var materiRouter = require("./materiRoutes");
var soalRouter = require("./soalRoutes");
var pembayaranRouter = require("./pembayaranRoutes");
var kelulusanRouter = require("./kelulusanRoutes");

router.use("/", pesertaRouter);
router.use("/uploads", uploadRouter);
router.use("/peraturan", peraturanRouter);
router.use("/penilaian", nilaiRouter);
router.use("/pengumuman", pengumumanRouter);
router.use("/profil", profilRouter);
router.use("/kehadiran", kehadiranRouter);
router.use("/materi", materiRouter);
router.use("/soal", soalRouter);
router.use("/pembayaran", pembayaranRouter);
router.use("/kelulusan", kelulusanRouter);

module.exports = router;
