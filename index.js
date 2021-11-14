const express = require('express');
const app = express();

const todosRouter = require('./api/todos.router')

// app.get('/', (req, res) => {
//     return res.send('hola');
// }) 

app.use('/todos', todosRouter)

app.listen(5000, (err) => {
    if (!err) {
        console.log('Servidor escuchando en el puerto 5000')
    }
});