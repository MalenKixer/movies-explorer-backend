const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const ConflictError = require('../utils/errors/ConflictError');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм по указанному _id не найден'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .orFail(new NotFoundError('Фильм по указанному _id не найден'))
          .then((deleteMovie) => res.send(deleteMovie))
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new BadRequestError('Передан некорректный _id фильма'));
            } else {
              next(err);
            }
          });
      } else {
        next(new ForbiddenError('Данный фильм нельзя удалить, так как он не принадлежит вам'));
      }
    })
    .catch(next);
};
module.exports.postMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    nameRU,
    nameEN,
    trailerLink,
    id,
  } = req.body;
  Movie.findOne({ id, nameRU })
    .then((result) => {
      if (!result) {
        Movie.create({
          country,
          director,
          duration,
          year,
          description,
          image,
          nameRU,
          nameEN,
          trailerLink,
          id,
          owner,
        })
          .then((movie) => res.send(movie))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new BadRequestError('Переданы некорректные данные при создании фильма'));
            } else {
              next(err);
            }
          });
      } else {
        next(new ConflictError('Данный фильм уже сохранен.'));
      }
    })
    .catch((err) => {
      next(err);
    });
};
module.exports.likeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFoundError('Фильм по указанному _id не найден'))
    .then((updateMovie) => res.send(updateMovie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundError('Фильм по указанному _id не найден'))
    .then((likes) => res.send(likes))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id фильма'));
      } else {
        next(err);
      }
    });
};
