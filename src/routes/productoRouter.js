const router = require('express').Router();
const productoController = require('../controllers/productoController');
const upload = require('../middlewares/multer');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

router.post('/', upload.single('foto'), productoController.addProduct);
router.get('/', isAuth, isAdmin, productoController.getProducts);
router.get('/:id', productoController.getProductById);
router.post('/update', upload.single('foto'), productoController.updateProduct);
router.get('/delete/:id', productoController.deleteProduct);
router.get('/categories/:filtro', productoController.findByCategory);

module.exports = router;