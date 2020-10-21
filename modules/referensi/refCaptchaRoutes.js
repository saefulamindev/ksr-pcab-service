const express = require("express");
const router = express.Router();
const refCaptchaController = require("./refCaptchaController");

router.get("/", refCaptchaController.getCaptcha);

module.exports = router;
