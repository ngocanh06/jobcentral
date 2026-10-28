const JobService = require('../services/job.service');

async function getJobCategories(req, res, next) {
  try {
    const categories = await JobService.getJobCategories();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getJobCategories,
};