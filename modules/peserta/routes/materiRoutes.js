const express = require("express");
const router = express.Router();
const materiController = require("../controller/materiController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/all", reqAuth, materiController.get);

router.get("/:id", reqAuth, materiController.getById);

module.exports = router;
