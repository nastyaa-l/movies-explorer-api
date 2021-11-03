const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/constatns');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const AuthError = require('../errors/AuthError');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким email существует');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email, password: hash, name,
    })
      .then((user) => res.status(200).send({
        user: {
          email: user.email,
          name: user.name,
          _id: user._id,
        },
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequestError(err.message);
        }
        return next(err);
      }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 36000000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
      })
        .send({ message: 'Авторизация прошла успешно!' });
    })
    .catch((err) => {
      if (err.message === 'IncorrectEmailOrPassword') {
        next(new AuthError('Неправильная почта или пароль'));
      } else {
        next(err);
      }
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt').json({ message: 'Выход выполнен' });
};

module.exports = {
  getUser, updateUser, createUser, login, logout,
};
