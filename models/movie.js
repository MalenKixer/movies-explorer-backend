const mongoose = require('mongoose');
const validatorUrl = require('validator').isURL;

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
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
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
