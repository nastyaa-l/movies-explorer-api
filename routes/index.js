const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const router = Router();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string(),
  }),
}), createUser);

router.use(auth);

router.post('/signout', logout);

router.use('/', usersRouter);
router.use('/', moviesRouter);

module.exports = router;
