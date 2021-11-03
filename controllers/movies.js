const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const AuthError = require('../errors/AuthError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailer, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      } else {
        throw new AuthError('Недостаточно прав!');
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с таким id не найдена');
      } else if (movie.owner.toString() === req.user._id.toString()) {
        return movie.remove()
          .then(() => res.status(200).send({ message: 'Фильм удален' }));
      }
      throw new ForbiddenError('Недостаточно прав!');
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};
module.exports = {
  getMovies, createMovie, deleteMovie,
};
