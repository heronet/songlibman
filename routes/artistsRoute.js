const { getArtists, getArtist, addArtist } = require('../controllers/artistController');
const tokenValidator = require('../middleware/tokenValidator');

const router = require('express').Router();

// Validate Token
router.use(tokenValidator);

router.route('/')
      .get(getArtists)
      .post(addArtist)
router.route('/:id')
      .get(getArtist)

module.exports = router;