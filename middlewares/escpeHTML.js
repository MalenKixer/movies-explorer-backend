const escapeHTML = require('escape-html');

module.exports = (req, res, next) => {
  Object.entries(req.body).forEach(([key, value]) => {
    req.body[key] = escapeHTML(value);
  });
  next();
};
