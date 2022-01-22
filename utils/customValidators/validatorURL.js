const validatorUrl = require('validator').isURL;
const BadRequestError = require('../errors/BadRequestError');

const validateURL = (value) => {
  if (!validatorUrl(value, { require_protocol: true })) {
    throw new BadRequestError('Неправильный формат ссылки');
  }
  return value;
};
module.exports = validateURL;
