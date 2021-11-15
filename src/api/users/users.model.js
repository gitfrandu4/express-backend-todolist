// 1. Importamos mongoose
const mongoose = require('mongoose');

// 2. Aquí definimos el esquema de un todo
const schema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    email: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 100,
        unique: true
    }
}, {timestamps: true})

// 3. 
// todo => nombre del recurso que podemos guardar en la bd
const USERmodel = mongoose.model('user', schema)

// 4. Exportamos el modelo
module.exports = USERmodel;