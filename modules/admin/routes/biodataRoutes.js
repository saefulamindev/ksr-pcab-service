const express = require("express");
const router = express.Router();
const biodataController = require("../controller/biodataController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Halaman Biodata");
});
router.get("/all", reqAuth, biodataController.get);
router.get("/:id_user", reqAuth, biodataController.getById);

module.exports = router;
