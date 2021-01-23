const express = require("express");
const uploadController = require("../controller/uploadController");
const router = express.Router();
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");
const { uploadFile } = require("../../../middleware/upload");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Dashboard Upload");
});

router.post(
  "/buktiBayar",
  reqAuth,
  uploadFile.single("bukti_bayar"),
  uploadController.uploadBuktiBayar
);

router.post(
  "/dokumenPendaftaran/:id_user",
  reqAuth,
  uploadFile.single("file_form_pendaftaran"),
  uploadController.uploadDokumenPendaftaran
);

router.post(
  "/suratPersetujuan/:id_user",
  reqAuth,
  uploadFile.single("file_persetujuan"),
  uploadController.uploadSuratPersetujuan
);

router.post(
  "/suratKomitmen/:id_user",
  reqAuth,
  uploadFile.single("file_komitmen"),
  uploadController.uploadSuratKomitmen
);

router.post(
  "/fileFoto/:id_user",
  reqAuth,
  uploadFile.single("file_foto"),
  uploadController.uploadFileFoto
);

router.post(
  "/berkasPendaftaran/:id_user",
  reqAuth,
  uploadFile.fields([
    {
      name: "file_form_pendaftaran",
      maxCount: 1,
    },
    {
      name: "file_persetujuan",
      maxCount: 1,
    },
    {
      name: "file_komitmen",
      maxCount: 1,
    },
  ]),
  uploadController.uploadBerkasPendaftaran
);

// router.post("/buktiPembayaran", reqAuth, uploadController.uploadBuktiPembayaran);

module.exports = router;
