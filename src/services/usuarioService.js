const usuarioDao = require('../database/daos/usuarioDao');

const usuarioService = {
    addUserService : async (user) => {
            try{
                const data = await usuarioDao.addUser(user);
                return data;
            }catch (e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
    },
    findUserService : async (username) => {
            try{
                const data = await usuarioDao.findUser(username);
                return data;
            }catch (e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
    },
    findUserLoginService : async (username,password) => {
            try{
                const data = await usuarioDao.findUserLogin(username,password);
                return data;
            }catch (e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
    }
};

module.exports = usuarioService;