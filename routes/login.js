const router = require('express').Router();
const { login } = require('../controllers/users');
const { celebrateLogin } = require('../middlewares/validationCelebrate/celebrateUser');

router.post('/signin', celebrateLogin, login);

module.exports = router;
