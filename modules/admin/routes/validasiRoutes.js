const express = require('express');
const router = express.Router();
const validasiController = require('../controller/validasiController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Halaman validasi');
});

module.exports = router;