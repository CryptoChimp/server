const express = require('express');
const {
  getCurrentUser,
  buyCoin,
  sellCoin,
} = require('../controllers/userController');
const authCheck = require('../middleware/authCheck');

const router = express.Router();

router.get('/', authCheck, getCurrentUser);
router.post('/buy', authCheck, buyCoin);
router.post('/sell', authCheck, sellCoin);

module.exports = router;
