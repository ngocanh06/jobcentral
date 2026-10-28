const healthModel = require('../models/health.model');

async function check() {
  await healthModel.checkDatabase();

  return {
    status: 'ok',
    database: 'connected',
    timestamp: new Date().toISOString()
  };
}

module.exports = { check };
