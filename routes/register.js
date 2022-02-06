const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { celebrateCreate } = require('../middlewares/validationCelebrate/celebrateUser');

router.post('/signup', celebrateCreate, createUser);

module.exports = router;
