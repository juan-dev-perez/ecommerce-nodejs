const router = require('express').Router();
const mensajeController = require('../controllers/mensajeController');
const isAuth = require('../middlewares/isAuth');

router.post('/', mensajeController.newMessage);
router.get('/', isAuth, mensajeController.getMessages);
router.get('/:id', mensajeController.getMessagesById);

module.exports = router;