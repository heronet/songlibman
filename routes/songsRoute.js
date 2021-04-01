const { getSongs, addSong, getSong } = require('../controllers/songController');
const tokenValidator = require('../middleware/tokenValidator');

const router = require('express').Router();

router.route('/')
      .post(tokenValidator, addSong)
      .get(tokenValidator, getSongs)
router.route('/:id')
      .get(tokenValidator, getSong)
module.exports = router;