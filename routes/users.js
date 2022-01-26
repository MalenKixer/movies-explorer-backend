const router = require('express').Router();
const escapeHTML = require('../middlewares/escpeHTML');
const {
  updateUser, getUser, deleteToken,
} = require('../controllers/users');
const { celebrateUpdate } = require('../middlewares/validationCelebrate/celebrateUser');

router.delete('/me/token', deleteToken);
router.get('/me', getUser);
router.patch('/me', escapeHTML, celebrateUpdate, updateUser);

module.exports = router;
