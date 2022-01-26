const router = require('express').Router();
const escapeHTML = require('../middlewares/escpeHTML');
const {
  getMovies, deleteMovie, postMovie, likeMovie, dislikeMovie,
} = require('../controllers/movies');
const { celebratePost, celebrateDelete, celebrateLikes } = require('../middlewares/validationCelebrate/celebrateMovie');

router.get('/', getMovies);
router.delete('/:movieId', celebrateDelete, deleteMovie);
router.post('/', escapeHTML, celebratePost, postMovie);
router.put('/:movieId/likes', celebrateLikes, likeMovie);
router.delete('/:movieId/likes', celebrateLikes, dislikeMovie);

module.exports = router;
