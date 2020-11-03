const express = require("express");
const router = express.Router();
const materiController = require("../controller/materiController");
const passport = require("passport");

/* GET users listing. */
router.get("/", passport.authenticate("jwt", { session: false }), function (
  req,
  res,
  next
) {
  res.send("Halaman materi diklat");
});

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  materiController.get
);
router.post(
  "/tambah",
  passport.authenticate("jwt", { session: false }),
  materiController.create
);
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  materiController.update
);
router.post(
  "/hapus/:id",
  passport.authenticate("jwt", { session: false }),
  materiController.delete
);

module.exports = router;
