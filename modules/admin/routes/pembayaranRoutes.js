const express = require('express');
const router = express.Router();
const pembayaranController = require('../controller/pembayaranController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Halaman pembayaran');
});

module.exports = router;