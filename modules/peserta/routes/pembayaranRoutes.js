const express = require("express");
const router = express.Router();
const pembayaranController = require("../controller/pembayaranController");
const passport = require("passport");
const { reqAuth } = require("../../../middleware/reqAuth");
const multer = require("multer");

/* GET users listing. */
router.get("/all", reqAuth, pembayaranController.get);
router.get("/:id_user", reqAuth, pembayaranController.getByIdUser);

router.get("/:jenis_bayar/all", reqAuth, pembayaranController.getByJenisBayar);
// router.get(
//   "/:jenis_bayar/:id_user",
//   reqAuth,
//   pembayaranController.getByJenisBayarIdUser
// );

router.get(
  "/tagihan/:id_user/:jenis_bayar",
  reqAuth,
  pembayaranController.getTagihan
);

module.exports = router;
