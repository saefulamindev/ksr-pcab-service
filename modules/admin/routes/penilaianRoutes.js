const express = require('express');
const router = express.Router();
const penilaianController = require('../controller/penilaianController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Halaman penilaian');
});

module.exports = router;