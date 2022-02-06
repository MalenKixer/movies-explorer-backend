const router = require('express').Router();
const auth = require('../middlewares/auth');
const moviesRoute = require('./movies');
const usersRoute = require('./users');
const login = require('./login');
const register = require('./register');
const incorrectRouteErrorHandler = require('../middlewares/incorrectRouteErrorHandler');

router.use('/', register);
router.use('/', login);
router.use('/movies', auth, moviesRoute);
router.use('/users', auth, usersRoute);
router.use(incorrectRouteErrorHandler);

module.exports = router;
