const pool = require('../../config/connectDB');

async function checkDatabase() {
  await pool.query('SELECT 1');
}

module.exports = { checkDatabase };
