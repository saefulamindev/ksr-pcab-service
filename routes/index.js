var express = require("express");
var router = express.Router();

var userRouter = require("../modules/user/userRoutes");
var adminRouter = require("../modules/admin/routes");
var pesertaRouter = require("../modules/peserta/routes");
var refCaptchaRouter = require("../modules/referensi/refCaptchaRoutes");

router.use("/users", userRouter);
router.use("/admin", adminRouter);
router.use("/peserta", pesertaRouter);
router.use("/getCaptcha", refCaptchaRouter);

module.exports = router;
