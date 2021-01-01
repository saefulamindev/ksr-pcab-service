const express = require("express");
const pesertaController = require("../controller/pesertaController");
const router = express.Router();
const passport = require("passport");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Dashboard Peserta");
});
router.post(
  "/isi-form/",
  // passport.authenticate("jwt", { session: false }),
  pesertaController.isiForm
);

module.exports = router;
