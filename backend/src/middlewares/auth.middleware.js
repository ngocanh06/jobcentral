const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authorization = req.get('authorization');
  const [scheme, token] = authorization ? authorization.split(' ') : [];

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      error: { message: 'A bearer token is required.' }
    });
  }

  if (!process.env.JWT_SECRET) {
    return next(new Error('JWT_SECRET is not configured.'));
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: { message: 'The bearer token is invalid or expired.' }
      });
    }

    return next(error);
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: { message: 'Authentication is required.' }
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: { message: 'You do not have permission to access this resource.' }
      });
    }

    return next();
  };
}

module.exports = { authenticate, authorize };
