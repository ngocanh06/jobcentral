const { validationResult } = require('express-validator');

function validate(validations) {
  return async (req, res, next) => {
    try {
      await Promise.all(validations.map((validation) => validation.run(req)));
    } catch (error) {
      return next(error);
    }

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        error: {
          message: 'Request validation failed.',
          details: result.array()
        }
      });
    }

    return next();
  };
}

module.exports = validate;
