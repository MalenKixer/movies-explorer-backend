const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
  } else {
    jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', (err, payload) => {
      if (err) {
        next(new UnauthorizedError('Передан неверный логин или пороль'));
      } else {
        req.user = payload;
      }
    });
  }
  next();
};

module.exports = auth;
