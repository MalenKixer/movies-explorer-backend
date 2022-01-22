const { ForbiddenCode } = require('../const');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ForbiddenCode;
  }
}
module.exports = ForbiddenError;
