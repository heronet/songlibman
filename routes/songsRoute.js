const { getSongs, addSong, getSong } = require('../controllers/songController');
const tokenValidator = require('../middleware/tokenValidator');

const router = require('express').Router();

// Validate Token
router.use(tokenValidator);

router.route('/')
      .post(addSong)
      .get(getSongs);
router.route('/:id')
      .get(getSong);

module.exports = router;