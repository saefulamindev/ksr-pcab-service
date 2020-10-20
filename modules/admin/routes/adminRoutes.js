const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Dashboard');
});

router.get('/countUser', function(req, res, next) {
  res.send();
});

module.exports = router;
