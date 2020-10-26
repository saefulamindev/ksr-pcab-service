const express = require("express");
const router = express.Router();
const biodataController = require("../controller/biodataController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Halaman Biodata");
});
router.get("/all", biodataController.get);
router.get("/:id_user", biodataController.getById);

module.exports = router;
