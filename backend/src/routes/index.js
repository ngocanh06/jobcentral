const express = require('express');
const healthRoutes = require('./health.routes');
const jobRoutes = require('./job.route');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/jobs', jobRoutes);

module.exports = router;
