const express = require("express");
const nilaiController = require("../controller/nilaiController");
const router = express.Router();
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
// Nilai Fisik
router.get("/fisik", reqAuth, nilaiController.getFisik);
router.get("/fisik/:id", reqAuth, nilaiController.getFisikById);

// Nilai Afektif
router.get("/afektif/all", reqAuth, nilaiController.getAfektif);
router.get("/afektif/:id_user", reqAuth, nilaiController.getAfektifByIdUser);

// Nilai Essay
router.get("/essay/:jenis_tes/:id_user", reqAuth, nilaiController.getEssay);
router.get("/essay/:id", reqAuth, nilaiController.getEssayById);

// Nilai total
router.get("/kognitif/:id_user", reqAuth, nilaiController.getNilaiById);

// Nilai Akhir
router.get("/nilai-akhir/:id_user", reqAuth, nilaiController.getNilaiAkhirById);

module.exports = router;
