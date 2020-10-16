const express = require('express');
const router = express.Router();
const UserController = require('./user-controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('User API');
});

router.post('/login', UserController.login)

module.exports = router;
