const router = require('express').Router();
const { validateUserUpdate } = require('../middlewares/validator');

const {
  getUser, updateUser,
} = require('../controllers/users');

router.get('/users/me', getUser);

router.patch('/users/me', validateUserUpdate, updateUser);

module.exports = router;
