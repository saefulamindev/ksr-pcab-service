const express = require("express");
const router = express.Router();
const pengumumanController = require("../controller/pengumumanController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Halaman pengumuman");
});

router.get("/all", reqAuth, pengumumanController.get);

router.post("/tambah", reqAuth, pengumumanController.create);

router.post("/edit/:id", reqAuth, pengumumanController.update);

router.post("/hapus/:id", reqAuth, pengumumanController.delete);

module.exports = router;
