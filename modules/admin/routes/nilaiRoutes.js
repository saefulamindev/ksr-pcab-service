const express = require("express");
const router = express.Router();
const nilaiController = require("../controller/nilaiController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Halaman penilaian");
});

// Nilai Afektif
router.get("/afektif/all", nilaiController.getAfektif);
router.post("/afektif/tambah", nilaiController.createAfektif);
router.post("/afektif/edit/:id_user", nilaiController.updateAfektif);
router.post("/afektif/hapus/:id_user", nilaiController.deleteAfektif);

module.exports = router;
