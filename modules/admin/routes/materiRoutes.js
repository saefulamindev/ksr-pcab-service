const express = require("express");
const router = express.Router();
const materiController = require("../controller/materiController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Halaman materi diklat");
});

router.get("/all", materiController.get);
router.post("/tambah", materiController.create);
router.post("/edit/:id", materiController.update);
router.post("/hapus/:id", materiController.delete);

module.exports = router;
