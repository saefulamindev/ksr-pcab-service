const express = require('express');
const router = express.Router();
const pengumumanController = require('../controller/pengumumanController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Halaman pengumuman');
});

module.exports = router;