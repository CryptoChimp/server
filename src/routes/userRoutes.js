const express = require('express');
const userController = require('../controllers/userController');
const authCheck = require('../middleware/authCheck');

const router = express.Router();

router.get('/', authCheck, userController.getCurrentUser);

module.exports = router;
