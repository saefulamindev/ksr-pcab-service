const express = require('express');
const router = express.Router();
const materidiklatController = require('../controller/materidiklatController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Halaman materi diklat');
});

module.exports = router;