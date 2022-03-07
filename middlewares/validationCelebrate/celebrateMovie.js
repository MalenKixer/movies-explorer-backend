const { Joi, celebrate } = require('celebrate');
const validateUrl = require('../../utils/customValidators/validatorURL');

module.exports.celebratePost = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    nameRU: Joi.string().allow(null, ''),
    nameEN: Joi.string().allow(null, ''),
    trailerLink: Joi.string().custom(validateUrl).required(),
    id: Joi.number().required(),
  }),
});
module.exports.celebrateDelete = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});
module.exports.celebrateLikes = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});
