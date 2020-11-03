const express = require("express");
const router = express.Router();
const pengumumanController = require("../controller/pengumumanController");
const passport = require("passport");

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  res.send("Halaman pengumuman");
});

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  pengumumanController.get
);
router.post(
  "/tambah",
  passport.authenticate("jwt", { session: false }),
  pengumumanController.create
);
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  pengumumanController.update
);
router.post(
  "/hapus/:id",
  passport.authenticate("jwt", { session: false }),
  pengumumanController.delete
);

module.exports = router;
