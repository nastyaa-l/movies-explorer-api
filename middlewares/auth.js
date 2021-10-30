const jwt = require('jsonwebtoken');
const Auth = require('../errors/AuthError');

const extractBearerToken = (header) => header.replace('Bearer ', '');

const auth = (req, res, next) => {
  const { JWT_SECRET = 'dev-key' } = process.env;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Auth('Необходима авторизация');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Auth('Необходима авторизация');
  }

  req.user = payload;

  next();
};

module.exports = auth;
