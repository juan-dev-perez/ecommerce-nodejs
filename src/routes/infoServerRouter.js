const router = require('express').Router();
const infoServerController = require('../controllers/infoServerController');

router.get('/', infoServerController);

module.exports = router;