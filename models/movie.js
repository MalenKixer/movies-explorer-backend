const mongoose = require('mongoose');
const validatorUrl = require('validator').isURL;

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: {
      type: String,
      required: true,
    },
  },
  id: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(avatar) {
        return validatorUrl(avatar, { protocols: ['http', 'https'], require_protocol: true });
      },
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', movieSchema);
