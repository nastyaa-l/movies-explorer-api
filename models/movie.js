const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
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
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/(www\.)?([\w.]+?)\.([a-z]{2,6})([\w\d\-._~:/?#[\]@!$&'()*+,;=]*)#?$/.test(v),
      message: (link) => `${link.value} - некорректная ссылка`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/(www\.)?([\w.]+?)\.([a-z]{2,6})([\w\d\-._~:/?#[\]@!$&'()*+,;=]*)#?$/.test(v),
      message: (link) => `${link.value} - некорректная ссылка`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/(www\.)?([\w.]+?)\.([a-z]{2,6})([\w\d\-._~:/?#[\]@!$&'()*+,;=]*)#?$/.test(v),
      message: (link) => `${link.value} - некорректная ссылка`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRu: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
