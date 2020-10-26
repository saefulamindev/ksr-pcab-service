const express = require("express");
const router = express.Router();
const peraturanController = require("../controller/peraturanController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Halaman peraturan");
});

router.get("/all", peraturanController.get);
router.post("/tambah", peraturanController.create);

module.exports = router;
