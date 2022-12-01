const carritoDao = require('../database/daos/carritoDao');

const carritoService = {
    verCarService : async (email) => {
            try{
                const data = await carritoDao.verCar(email);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    delCarService : async (email) => {
            try{
                const data = await carritoDao.delCar(email);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    listCarService : async (email) => {
            try{
                const data = await carritoDao.listCar(email);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    addProdCarService : async (email, idProduct) => {
            try{
                const car = await carritoDao.verCar(email);
                const data = await carritoDao.addProdCar(email, idProduct);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    deleteProdCarService : async (email,id) => {
            try{
                const data = await carritoDao.deleteProdCar(email, id);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    finCarService : async (nombre, email) => {
            try{
                await carritoDao.carFin(nombre, email);
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        }
}

module.exports = carritoService;