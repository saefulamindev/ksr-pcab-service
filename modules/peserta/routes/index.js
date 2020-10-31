var express = require("express");
var router = express.Router();

var pesertaRouter = require("./pesertaRoutes");
var uploadRouter = require("./uploadRoutes");

router.use("/", pesertaRouter);
router.use("/uploads", uploadRouter);

module.exports = router;
