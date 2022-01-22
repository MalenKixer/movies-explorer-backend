const { NotFoundCode } = require('../const');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NotFoundCode;
  }
}
module.exports = NotFoundError;
