const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const escapeHTML = require('../middlewares/escpeHTML');
const {
  updateUser, getUser, deleteToken,
} = require('../controllers/users');

router.delete('/me/token', deleteToken);
router.get('/me', getUser);
router.patch('/me', escapeHTML, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

module.exports = router;
