const healthService = require('../services/health.service');

async function check(req, res, next) {
  try {
    const health = await healthService.check();
    res.status(200).json(health);
  } catch (error) {
    next(error);
  }
}

module.exports = { check };
