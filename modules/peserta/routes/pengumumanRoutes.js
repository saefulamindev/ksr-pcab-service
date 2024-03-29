const express = require("express");
const pengumumanController = require("../controller/pengumumanController");
const router = express.Router();
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/", reqAuth, pengumumanController.get);

module.exports = router;
