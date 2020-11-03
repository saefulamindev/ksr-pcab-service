const express = require("express");
const router = express.Router();
const peraturanController = require("../controller/peraturanController");
const passport = require("passport");

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  res.send("Halaman peraturan");
});

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  peraturanController.get
);
router.post(
  "/tambah",
  passport.authenticate("jwt", { session: false }),
  peraturanController.create
);
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  peraturanController.update
);
router.post(
  "/hapus/:id",
  passport.authenticate("jwt", { session: false }),
  peraturanController.delete
);

module.exports = router;
