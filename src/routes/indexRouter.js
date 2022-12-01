const router = require('express').Router();
const index = require('../controllers/indexController');
const isAuth = require('../middlewares/isAuth');

router.get('/', isAuth, index);

module.exports = router;