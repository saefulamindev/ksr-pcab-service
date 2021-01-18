const express = require("express");
const pesertaController = require("../controller/pesertaController");
const router = express.Router();
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");
const { uploadFile } = require("../../../middleware/upload");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Dashboard Peserta");
});
router.post(
  "/isi-form/",
  reqAuth,
  uploadFile.single("file_foto"),
  pesertaController.isiForm
);

module.exports = router;
