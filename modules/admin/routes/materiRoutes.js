const express = require("express");
const router = express.Router();
const materiController = require("../controller/materiController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Halaman materi diklat");
});

router.get("/all", reqAuth, materiController.get);

router.post("/tambah", reqAuth, materiController.create);

router.post("/edit/:id", reqAuth, materiController.update);

router.post("/hapus/:id", reqAuth, materiController.delete);

module.exports = router;
