// 1. Importamos mongoose
const mongoose = require('mongoose');

// 2. Aquí definimos el esquema de un todo
const schema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    completed: {
        required: true,
        type: Boolean,
        default: false
    }
}, {timestamps: true})

// 3. 
// todo => nombre del recurso que podemos guardar en la bd
const TODOmodel = mongoose.model('todo', schema)

// 4. Exportamos el modelo
module.exports = TODOmodel;