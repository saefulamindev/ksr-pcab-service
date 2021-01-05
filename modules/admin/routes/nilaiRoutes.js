const express = require("express");
const router = express.Router();
const nilaiController = require("../controller/nilaiController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Halaman penilaian");
});
// Nilai Fisik
router.get("/fisik/all", reqAuth, nilaiController.getFisik);
router.post("/fisik/edit/:id_user", reqAuth, nilaiController.updateFisik);

// Nilai Afektif
router.get("/afektif/all", reqAuth, nilaiController.getAfektif);
router.post("/afektif/tambah", reqAuth, nilaiController.createAfektif);
router.post("/afektif/edit/:id_user", reqAuth, nilaiController.updateAfektif);
router.post("/afektif/hapus/:id_user", reqAuth, nilaiController.deleteAfektif);
// Nilai Essay
router.get("/essay/:jenis_tes/:id_user", reqAuth, nilaiController.getEssay);
router.get("/essay/:id", reqAuth, nilaiController.getEssayById);
router.post("/essay/edit/:id", reqAuth, nilaiController.updateEssay);
// Nilai Total
router.get("/total/:id_user", reqAuth, nilaiController.getNilaiTotal);

//Nilai Akhir
router.get("/all", reqAuth, nilaiController.getNilai);
router.get("/:id_user/all", reqAuth, nilaiController.getNilaiById);
router.get("/jenis_tes/:jenis_tes", reqAuth, nilaiController.getNilaiByTes);
router.post("/tambah/:id_user", reqAuth, nilaiController.inputNilai);
router.get("/nilai_akhir/:id_user", reqAuth, nilaiController.getNilaiAkhirById);

module.exports = router;
