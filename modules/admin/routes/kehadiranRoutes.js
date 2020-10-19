const express = require('express');
const router = express.Router();
const kehadiranController = require('../controller/kehadiranController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Halaman Kehadiran');
});

module.exports = router;