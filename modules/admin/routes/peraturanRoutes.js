const express = require("express");
const router = express.Router();
const peraturanController = require("../controller/peraturanController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Halaman peraturan");
});

router.get("/all", reqAuth, peraturanController.get);

router.post("/tambah", reqAuth, peraturanController.create);

router.post("/edit/:id", reqAuth, peraturanController.update);

router.post("/hapus/:id", reqAuth, peraturanController.delete);

module.exports = router;
