const express = require('express');
const healthController = require('../controllers/check.controller');

const router = express.Router();

router.get('/', healthController.check);

module.exports = router;
