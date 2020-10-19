const express = require('express');
const router = express.Router();
const kelulusanController = require('../controller/kelulusanController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Halaman Kelulusan');
});

module.exports = router;