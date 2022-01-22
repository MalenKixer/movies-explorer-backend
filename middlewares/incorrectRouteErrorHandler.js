const NotFoundError = require('../utils/errors/NotFoundError');

const incorrectRouteErrorHandler = (req, res, next) => {
  next(new NotFoundError('Данный адрес не существует. Проверьте корректность адреса и повоторите попытку'));
};

module.exports = incorrectRouteErrorHandler;
