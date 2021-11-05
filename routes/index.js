const { Router } = require('express');
const { login, createUser, logout } = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { validateLogin, validateUser } = require('../middlewares/validator');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const router = Router();

router.post('/signin', validateLogin, login);
router.post('/signup', validateUser, createUser);

router.use(auth);

router.post('/signout', logout);

router.use('/', usersRouter);
router.use('/', moviesRouter);

router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
