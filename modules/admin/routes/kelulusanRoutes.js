const express = require("express");
const router = express.Router();
const kelulusanController = require("../controller/kelulusanController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Halaman Kelulusan");
});
router.get("/all", kelulusanController.get);
router.post("/edit/:id_user", kelulusanController.update);

module.exports = router;
