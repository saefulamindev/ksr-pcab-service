const express = require("express");
const router = express.Router();
const soalController = require("../controller/soalController");
const passport = require("passport");

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  res.send("Halaman soal");
});

// soal PG
router.get(
  "/pg/all",
  passport.authenticate("jwt", { session: false }),
  soalController.getPG
);
router.post(
  "/pg/tambah",
  passport.authenticate("jwt", { session: false }),
  soalController.createPG
);
router.post(
  "/pg/edit/:id",
  passport.authenticate("jwt", { session: false }),
  soalController.updatePG
);
router.post(
  "/pg/hapus/:id",
  passport.authenticate("jwt", { session: false }),
  soalController.deletePG
);

// soal essay
router.get(
  "/essay/all",
  passport.authenticate("jwt", { session: false }),
  soalController.getEssay
);
router.post(
  "/essay/tambah",
  passport.authenticate("jwt", { session: false }),
  soalController.createEssay
);
router.post(
  "/essay/edit/:id",
  passport.authenticate("jwt", { session: false }),
  soalController.updateEssay
);
router.post(
  "/essay/hapus/:id",
  passport.authenticate("jwt", { session: false }),
  soalController.deleteEssay
);

module.exports = router;
