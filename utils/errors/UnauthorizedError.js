const { UnauthorizedCode } = require('../const');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UnauthorizedCode;
  }
}
module.exports = UnauthorizedError;
