const { celebrate, Joi } = require('celebrate');

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2),
    email: Joi.string().required().email(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailer: Joi.string().required().uri(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().uri(),
    movieId: Joi.number().integer(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateUser,
  validateLogin,
  validateMovie,
  validateUserUpdate,
  validateMovieId,
};
