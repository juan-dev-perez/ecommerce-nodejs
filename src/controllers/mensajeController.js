const mensajeService = require('../services/mensajeService');

const mensajeController = {
    newMessage : async (req, res) => {
            try{
                const data = await mensajeService.newMesService(req.body);
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    getMessages : async (req, res) => {
            try{
                const email = req.session.passport.user;
                const data = await mensajeService.getMesService();
                res.render('pages/mensajes',{data, email});
                return data;
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        },
    getMessagesById : async (req, res) => {
            try{
                const data = await mensajeService.getMessByIdService(req.params.id);
                res.send(data)
            }catch(e){
                console.log(`Ha ocurrido el siguiente error: ${e}`);
            }
        }
}

module.exports = mensajeController;