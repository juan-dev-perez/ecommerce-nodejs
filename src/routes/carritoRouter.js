const router = require('express').Router();
const carritoController = require('../controllers/carritoController');

router.get('/verifyCar/:email', carritoController.verifyCarrito);
router.get('/delCar/:email', carritoController.delCarrito);
router.get('/listCar/:email', carritoController.listCarrito);
router.get('/addProd/:email/:idProduct', carritoController.addProdCar);
router.get('/delProd/:email/:id', carritoController.delProdCar);
router.get('/finCar/:nombre/:email/', carritoController.finCarrito);

module.exports = router;