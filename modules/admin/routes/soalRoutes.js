const express = require("express");
const router = express.Router();
const soalController = require("../controller/soalController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Halaman soal");
});

// soal PG
router.get("/pg/all", reqAuth, soalController.getPG);
router.post("/pg/tambah", reqAuth, soalController.createPG);
router.post("/pg/edit/:id", reqAuth, soalController.updatePG);
router.post("/pg/hapus/:id", reqAuth, soalController.deletePG);

// soal essay
router.get("/essay/all", reqAuth, soalController.getEssay);
router.post("/essay/tambah", reqAuth, soalController.createEssay);
router.post("/essay/edit/:id", reqAuth, soalController.updateEssay);
router.post("/essay/hapus/:id", reqAuth, soalController.deleteEssay);

// kirim jawaban pg
router.post("/kirim-pg/:id_user", reqAuth, soalController.kirimJawaban);
// kirim jawaban essay
router.post("/kirim-essay/:id_user", reqAuth, soalController.kirimEssay);

module.exports = router;
