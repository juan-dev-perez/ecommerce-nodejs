const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
    id: { type: Number, require: true},
    email: {type: String, require: true, max:100},
    tipoUser: {type: String, require: true, max:100},
    fyh: {type: String, require: true, max:100},
    text: {type: String, require: true, max:200},
    respuesta: []
});

module.exports = mongoose.model('mensajes', mensajeSchema);