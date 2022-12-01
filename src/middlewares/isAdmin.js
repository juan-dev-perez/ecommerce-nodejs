const userService = require('../services/usuarioService');

const isAdmin = async (req, res, next) => {
    const email = req.session.passport.user;
    const user = await userService.findUserService(email);

    if(user.tipoUser){
        next();
    }else{
        console.log(`El usuario ${email} no tiene permisos para ingresar a esta sección`);
        res.redirect('/');
    }
}

module.exports = isAdmin;