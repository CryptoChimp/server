const express = require('express');
const homeController = require('../controllers/homeController');
const authCheck = require('../middleware/authCheck');

const router = express.Router();

router.get('/', authCheck, homeController.getCurrentUser);

module.exports = router;
