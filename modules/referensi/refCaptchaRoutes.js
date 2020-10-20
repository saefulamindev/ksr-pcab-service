const express = require("express");
const router = express.Router();
const refCaptchaController = require("./refCaptchaController");

router.get('/', refCaptchaController.get);


module.exports = router;