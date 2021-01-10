const express = require("express");
const router = express.Router();
const kehadiranController = require("../controller/kehadiranController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/:id_user", reqAuth, kehadiranController.getDetailUser);

module.exports = router;
