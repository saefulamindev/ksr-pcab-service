var express = require("express");
var router = express.Router();

var pesertaRouter = require("./pesertaRoutes");
var uploadRouter = require("./uploadRoutes");
var peraturanRouter = require("./peraturanRoutes");
var nilaiRouter = require("./nilaiRoutes");
var pengumumanRouter = require("./pengumumanRoutes");
var profilRouter = require("./profilRoutes");

router.use("/", pesertaRouter);
router.use("/uploads", uploadRouter);
router.use("/peraturan", peraturanRouter);
router.use("/fisik", nilaiRouter);
router.use("/pengumuman", pengumumanRouter);
router.use("/profil", profilRouter);

module.exports = router;
