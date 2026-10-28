const express = require('express');
const jobController = require('../controllers/job.controller');

const router = express.Router();

router.get('/categories', jobController.getJobCategories);

module.exports = router;