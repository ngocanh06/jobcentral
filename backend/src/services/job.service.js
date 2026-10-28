const pool = require("../../config/connectDB");

async function getJobCategories() {
  const result = await pool.query(
    'SELECT id FROM job_categories'
  );

  return result.rows;
}

module.exports = {
  getJobCategories,
};