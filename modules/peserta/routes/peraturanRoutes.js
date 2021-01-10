const express = require("express");
const peraturanController = require("../controller/peraturanController");
const router = express.Router();
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/", reqAuth, peraturanController.get);

module.exports = router;
