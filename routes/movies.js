const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const escapeHTML = require('../middlewares/escpeHTML');
const {
  getMovies, deleteMovie, postMovie, likeMovie, dislikeMovie,
} = require('../controllers/movies');
const validateUrl = require('../utils/customValidators/validatorURL');

router.get('/', getMovies);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteMovie);
router.post('/', escapeHTML, celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(validateUrl).required(),
    trailer: Joi.string().custom(validateUrl).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().custom(validateUrl).required(),
    movieId: Joi.string().required(),
  }),
}), postMovie);
router.put('/:movieId/likes', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), likeMovie);
router.delete('/:movieId/likes', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), dislikeMovie);

module.exports = router;
