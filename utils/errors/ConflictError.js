const { ConflictCode } = require('../const');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ConflictCode;
  }
}
module.exports = ConflictError;
