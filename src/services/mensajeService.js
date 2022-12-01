const mensajeDao = require('../database/daos/mensajeDao');
const userService = require('./usuarioService');

const mensajeService = {
    newMesService : async (mensaje) => {
            try{
                const user = await userService.findUserService(mensaje.email);
                if(user.tipoUser){
                    mensaje.tipoUser = 'Administrador';
                }else{
                    mensaje.tipoUser = "Cliente";
                }
                const data = await mensajeDao.addMessage(mensaje);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    getMesService : async () => {
            try{
                const data = await mensajeDao.readMessages();
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    getMessByIdService : async (id) => {
            try{
                const data = await mensajeDao.getMessById(id);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    messResService : async (idMess, resMess) => {
            try{
                const user = await userService.findUserService(resMess.email);
                if(user.tipoUser){
                    resMess.tipoUser = 'Administrador';
                }else{
                    resMess.tipoUser = "Cliente";
                }
                const data = await mensajeDao.addResMessage(idMess, resMess);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        }
}

module.exports = mensajeService;