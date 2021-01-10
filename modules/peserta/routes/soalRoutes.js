const express = require("express");
const router = express.Router();
const soalController = require("../controller/soalController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
// soal PG
router.get("/pg/all", reqAuth, soalController.getPG);
router.get("/pg/:id", reqAuth, soalController.getPGById);

// soal essay
router.get("/essay/all", reqAuth, soalController.getEssay);
router.get("/essay/:id", reqAuth, soalController.getEssayById);

// kirim jawaban pg
router.post("/kirim-pg/:id_user", reqAuth, soalController.kirimJawaban);
// kirim jawaban essay
router.post("/kirim-essay/:id_user", reqAuth, soalController.kirimEssay);

module.exports = router;
