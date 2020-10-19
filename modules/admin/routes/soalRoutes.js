const express = require('express');
const router = express.Router();
const soalController = require('../controller/soalController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Halaman soal');
});

module.exports = router;