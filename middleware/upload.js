const multer = require("multer");
const path = require("path");
const responseFormatter = require("../responses/responses");

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().getTime() + "-" + file.originalname);
//   },
// });

// const file_form_pendaftaran = req.file;
// const file_persetujuan = req.file;
// const file_komitmen = req.file;
// const file_foto = req.file;
// const bukti_bayar = req.file;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "file_form_pendaftaran") {
      cb(null, "uploads/fileFormPendaftaran");
    } else if (file.fieldname === "file_persetujuan") {
      cb(null, "uploads/filePersetujuan");
    } else if (file.fieldname === "file_komitmen") {
      cb(null, "uploads/fileKomitmen");
    } else if (file.fieldname === "file_foto") {
      cb(null, "uploads/fileFoto");
    } else if (file.fieldname === "bukti_bayar") {
      cb(null, "uploads/buktiBayar");
    }
  },

  filename: (req, file, cb) => {
    if (file.fieldname === "file_form_pendaftaran") {
      cb(
        null,
        new Date().getTime() + "-" + "pendaftaran" + "-" + file.originalname
      );
    } else if (file.fieldname === "file_persetujuan") {
      cb(
        null,
        new Date().getTime() + "-" + "persetujuan" + "-" + file.originalname
      );
    } else if (file.fieldname === "file_komitmen") {
      cb(
        null,
        new Date().getTime() + "-" + "komitmen" + "-" + file.originalname
      );
    } else if (file.fieldname === "file_foto") {
      cb(null, new Date().getTime() + "-" + "foto" + "-" + file.originalname);
    } else if (file.fieldname === "bukti_bayar") {
      cb(
        null,
        new Date().getTime() + "-" + "buktiBayar" + "-" + file.originalname
      );
    }
    // cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports.uploadFile =
  // (req, res, next) => {
  multer({ storage: fileStorage, fileFilter: fileFilter });

// multer({ storage: fileStorage });
// if (!req.file) {
//   return responseFormatter.error(res, null, "image harus diupload", 422);
// }
// else {
//   req.file;
//   next();
// }
// (req, res, next);
// };
