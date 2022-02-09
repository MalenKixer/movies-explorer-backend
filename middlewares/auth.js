const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
  } else {
    jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', (err, payload, callback) => {
      if (err) {
        callback(next(new UnauthorizedError('Передан неверный логин или пороль')));
      } else {
        req.user = payload;
      }
    });
  }
  next();
};
