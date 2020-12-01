var express = require("express");
var router = express.Router();

var pesertaRouter = require("./pesertaRoutes");
var uploadRouter = require("./uploadRoutes");
var peraturanRouter = require("./peraturanRoutes");
var nilaiRouter = require("./nilaiRoutes");

router.use("/", pesertaRouter);
router.use("/uploads", uploadRouter);
router.use("/peraturan", peraturanRouter);
router.use("/fisik", nilaiRouter);

module.exports = router;
