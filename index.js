const express = require('express');
const config = require('./config');
const app = express();

const todosRouter = require('./api/todos.router')

// app.get('/', (req, res) => {
//     return res.send('hola');
// }) 

app.use('/todos', todosRouter)

app.listen(config.PORT, (err) => {
    if (!err) {
        console.log('Servidor escuchando en el puerto: ' + config.PORT)
    }
});