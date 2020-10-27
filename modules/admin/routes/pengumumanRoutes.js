const express = require("express");
const router = express.Router();
const pengumumanController = require("../controller/pengumumanController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Halaman pengumuman");
});

router.get("/all", pengumumanController.get);
router.post("/tambah", pengumumanController.create);
router.put("/edit/:id", pengumumanController.update);

module.exports = router;
