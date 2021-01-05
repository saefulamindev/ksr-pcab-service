const express = require("express");
const router = express.Router();
const kelulusanController = require("../controller/kelulusanController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Halaman Kelulusan");
});
router.get("/all", reqAuth, kelulusanController.get);

router.post("/edit/:id_user", reqAuth, kelulusanController.update);

module.exports = router;
