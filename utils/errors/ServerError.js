const { internalServerErrorCode } = require('../const');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = internalServerErrorCode;
  }
}
module.exports = ServerError;
