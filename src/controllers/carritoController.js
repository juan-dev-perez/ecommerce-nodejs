const carritoService = require('../services/carritoService');

const carritoController = {
    verifyCarrito : async (req, res) => {
            try{
                const data = await carritoService.verCarService(req.params.email);
                res.send(data);
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    delCarrito : async (req, res) => {
            try{
                const data = await carritoService.delCarService(req.params.email);
                res.redirect('/');
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    listCarrito : async (req, res) => {
            try{
                const data = await carritoService.listCarService(req.params.email);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    addProdCar : async (req, res) => {
            try{
                const data = await carritoService.addProdCarService(req.params.email, req.params.idProduct);
                res.redirect('/');
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    delProdCar : async (req, res) => {
            try{
                const data = await carritoService.deleteProdCarService(req.params.email,req.params.id);
                res.redirect('/');
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    finCarrito : async (req, res) => {
            try{
                const nombre = req.params.nombre;
                const email = req.params.email;
                await carritoService.finCarService(nombre, email);
                res.render('pages/pedidoExito');
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        }
}

module.exports = carritoController;