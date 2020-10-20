const express = require('express');
const router = express.Router();
const biodataController = require('../controller/biodataController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Halaman Biodata');
});
router.get('/tahap/:id', function(req, res, next) {
  res.send('');
});



module.exports = router;

