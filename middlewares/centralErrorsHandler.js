const centralErrorsHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      name: 'error',
      message: statusCode === 500
        ? err.name
        : message,
    });
  next();
};

module.exports = centralErrorsHandler;
