const express = require("express");
const router = express.Router();
const kehadiranController = require("../controller/kehadiranController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");

/* GET users listing. */
router.get("/", reqAuth, function (req, res, next) {
  res.send("Halaman Kehadiran");
});
router.get("/materi/all", reqAuth, kehadiranController.getAll);

router.get("/materi/:id_materi", reqAuth, kehadiranController.getDetail);

router.post(
  "/materi/:id_materi/:id_user",
  reqAuth,
  kehadiranController.UpdateByM
);

router.get("/peserta/all", reqAuth, kehadiranController.getUser);

router.get("/peserta/:id_user", reqAuth, kehadiranController.getDetailUser);

router.post(
  "/peserta/:id_user/:id_materi",
  reqAuth,
  kehadiranController.updateHadirByUser
);

module.exports = router;
