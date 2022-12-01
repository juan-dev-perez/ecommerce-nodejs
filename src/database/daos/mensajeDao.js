const mongoose = require('mongoose');
const mensajeSchema = require('../models/mensajeSchema');
const NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${NODE_ENV}` });

class Chat{
    
    constructor(){
        
    }

    async connectDB(){
        try{
            const URL = process.env.URLDB;
            let connect = await mongoose.connect(URL,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }
    
    async addMessage(mensaje){
        try{
            await this.connectDB();
            const lastId = await mensajeSchema.find().sort({id:-1}).limit(1);
            if(lastId.length !== 0){
                mensaje.id = parseInt(lastId[0].id) + 1;
            }else{
                mensaje.id = 1;
            }
            await mensajeSchema.create(mensaje);
            mongoose.disconnect();
            return 'Mensaje guardado con exito';
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }
    
    async readMessages(){
        try{
            await this.connectDB();
            const data = await mensajeSchema.find();
            mongoose.disconnect();
            return data;
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }

    async getMessById(id){
        try{
            await this.connectDB();
            const mensaje = await mensajeSchema.find({id:id});
            mongoose.disconnect();
            return mensaje[0];
        }catch (e){
            return `Ha ocurrido el siguiente error: ${e}`;
        }
    }

    async addResMessage(idMess, resMess){
        try{
            await this.connectDB();
            await mensajeSchema.updateOne({id: idMess},{$push: {
                respuesta: resMess
            }});
            mongoose.disconnect();
            return 'Mensaje respondido con exito';
        }catch (e){
            console.log(`Ha ocurrido el siguiente error: ${e}`);
        }
    }

}

const chat = new Chat();

module.exports = chat;