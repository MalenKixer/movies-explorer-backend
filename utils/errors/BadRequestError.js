const { BadRequestCode } = require('../const');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BadRequestCode;
  }
}
module.exports = BadRequestError;
