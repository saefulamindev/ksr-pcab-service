const express = require("express");
const router = express.Router();
const soalController = require("../controller/soalController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Halaman soal");
});

// soal PG
router.get("/pg/all", soalController.getPG);
router.post("/pg/tambah", soalController.createPG);
router.post("/pg/edit/:id", soalController.updatePG);
router.post("/pg/hapus/:id", soalController.deletePG);

// soal essay
router.get("/essay/all", soalController.getEssay);
router.post("/essay/tambah", soalController.createEssay);
router.post("/essay/edit/:id", soalController.updateEssay);
router.post("/essay/hapus/:id", soalController.deleteEssay);

module.exports = router;
