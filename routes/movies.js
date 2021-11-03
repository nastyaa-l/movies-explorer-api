const router = require('express').Router();
const { validateMovie, validateMovieId } = require('../middlewares/validator');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', createMovie);
router.post('/movies', validateMovie, createMovie);
router.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = router;
