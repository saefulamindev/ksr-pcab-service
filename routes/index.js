var express = require('express');
var router = express.Router();
var userRouter = require("../modules/user/user-routes");

var adminRouter = require("../modules/admin/routes/adminRoutes");
var biodataRouter = require("../modules/admin/routes/biodataRoutes");

var pesertaRouter = require("../modules/peserta/peserta-routes");

router.use("/users", userRouter);

router.use("/admin", adminRouter);
router.use("/admin/biodata", biodataRouter);

router.use("/peserta", pesertaRouter);

module.exports = router;
