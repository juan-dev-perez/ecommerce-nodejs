const mongoose = require('mongoose');
const carritoSchema = require('../models/carritoSchema');
const product = require('./productoDao');
const {newOrder} = require('../../utils/nodemailer');
const NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${NODE_ENV}` });

class Car{

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
            console.log(`Ha ocurrido el siguiente error: ${e}`)
        }
    }

    async verCar(email){
        try{
            await this.connectDB();
            const carrito = await carritoSchema.find({email : email});
            await mongoose.disconnect();
            if(carrito.length !== 0){
                return carrito;
            }else{
                const fyh = new Date();
                const car = {
                    email : email,
                    fyh: `${fyh.getDate()}/${(fyh.getMonth() + 1)}/${fyh.getFullYear()} ${fyh.getHours()}:${fyh.getMinutes()}:${fyh.getSeconds()}`,
                    productos : []
                };
                await this.connectDB();
                await carritoSchema.create(car);
                await mongoose.disconnect();
                return car;
            }
        }catch (e){
            return `Ha ocurrido el siguiente error: ${e}`;
        }
    }

    async delCar(email){
        try{
            await this.connectDB();
            const car = await carritoSchema.find({email : email});
            if(car.length !== 0){
                await carritoSchema.deleteOne({email : email});
                mongoose.disconnect();
                return 'Carrito eliminado con exito';
            }else{
                mongoose.disconnect();
                return `No existe un carrito del usuario ${email}`;
            }
        }catch (e){
            return `Ha ocurrido el siguiente error: ${e}`;
        }
    }

    async listCar(email){
        try{
            await this.connectDB();
            const carrito = await carritoSchema.find({email : email});
            mongoose.disconnect();
            return carrito[0];
        }catch (e){
            return `Ha ocurrido el siguiente error: ${e}`;
        }
    }

    async addProdCar(email,idProduct){
        try{
            await this.connectDB();
            let carrito = await this.listCar(email);
            let productoId = await product.getProdById(parseInt(idProduct));
            mongoose.disconnect();

            if(carrito && productoId){
                await this.connectDB();
                productoId.idUnico = Date.now();
                const fyh = new Date();
                await carritoSchema.updateOne({email: email},{$push: {
                    productos: productoId
                }});
                await carritoSchema.updateOne({email: email},{$set: {
                    fyh: `${fyh.getDate()}/${(fyh.getMonth() + 1)}/${fyh.getFullYear()} ${fyh.getHours()}:${fyh.getMinutes()}:${fyh.getSeconds()}`
                }});
                mongoose.disconnect();
                return `Producto agregado al carrito del usuario ${email} con exito`;
            }else{
                return 'No existe el producto o el carrito';                                                                                                                                                                                                                                                                                                                                                                  }
        }catch (e){
            return `Ha ocurrido el siguiente error: ${e}`;
        }
    }
        
    async deleteProdCar(email, idUnico){
        try{
            await this.connectDB();
            let carrito = await this.listCar(email);
            mongoose.disconnect();
            
            if(carrito.length !== 0){
                const fyh = new Date();
                const producto = carrito.productos.find((producto) => producto.idUnico == idUnico);
                if(producto){
                    await this.connectDB();
                    await carritoSchema.updateOne({email: email},{$pull: {
                        productos: {idUnico : idUnico}
                    }});
                    await carritoSchema.updateOne({email: email},{$set: {
                        fyh: `${fyh.getDate()}/${(fyh.getMonth() + 1)}/${fyh.getFullYear()} ${fyh.getHours()}:${fyh.getMinutes()}:${fyh.getSeconds()}`
                    }});
                    mongoose.disconnect();
                    return `Producto eliminado del carrito del usuario ${email} con exito`;
                }else{
                    return `No existe el producto que se desea eliminar`;
                }
            }else{
                return `No existe el carrito del usuario ${email}`;
            }
        }catch (e){
            return `Ha ocurrido el siguiente error: ${e}`;
        }
    }

    async carFin(nombre, email){
        try{
            const carrito = await this.listCar(email);
            await newOrder(nombre,email,carrito);
            await this.delCar(email);
            return 'Pedido realizado con exito';
        }catch(e){
            return `Ha ocurrido el siguiente error: ${e}`;           
        }
    }

}

const car = new Car();

module.exports = car;