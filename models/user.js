const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validatorEmail = require('validator').isEmail;
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator(email) {
        return validatorEmail(email);
      },
      message: 'Неправильные почта или пороль',
    },
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError('Неправильные почта или пороль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError('Неправильные почта или пороль'));
        }
        return user;
      }))
    .catch((err) => next(err));
};

module.exports = mongoose.model('user', userSchema);
