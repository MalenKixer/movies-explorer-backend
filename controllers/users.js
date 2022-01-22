const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ConflictError = require('../utils/errors/ConflictError');

module.exports.createUser = (req, res, next) => {
  const {
    password, email, name,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            name, email, password: hash,
          }))
          .then((u) => res.send(u))
          .catch((error) => {
            if (error.name === 'MongoError' && error.code === 11000) {
              next(new ConflictError('Такая почта уже существует. Пожалуйста, введите другую почту'));
            } else if (error.name === 'ValidationError') {
              next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
            } else {
              next(error);
            }
          });
      } else {
        next(new ConflictError('Такая почта уже существует. Пожалуйста, введите другую почту'));
      }
    })
    .catch((error) => {
      res.send(error.name);
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(error);
      }
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7, // создать токен на 7 дней
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(next);
};
module.exports.deleteToken = (req, res) => {
  res
    .clearCookie('jwt')
    .send({ message: 'token successful delete' });
};
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id пользователя'));
      } else {
        next(err);
      }
    });
};
module.exports.updateUser = (req, res, next) => {
  const { name } = req.body;
  User.findByIdAndUpdate(req.user._id, { name }, { runValidators: true, new: true })
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id пользователя'));
      } else {
        next(err);
      }
    });
};
