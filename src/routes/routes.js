const router = require('express').Router();

router.use('/carrito', require('./carritoRouter'));
router.use('/', require('./indexRouter'));
router.use('/info', require('./infoServerRouter'));
router.use('/login', require('./loginRouter'));
router.use('/mensajes', require('./mensajeRouter'));
router.use('/productos', require('./productoRouter'));
router.use('/register', require('./registerRouter'));
router.use((req, res, next) => { 
    // console.log(`Ruta ${req.url} método ${req.method} no implementados`);
    res.redirect('/')
})

module.exports = router;