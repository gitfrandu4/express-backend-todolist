const express = require('express');
const mongoose = require('mongoose')
const config = require('./config');
const app = express();

mongoose.connect(`mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster0.vcqck.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`);

// Este middleware nos permite poder recibir bodies del tipo JSON
app.use(express.json())

const todosRouter = require('./src/api/todos.router')

app.use('/todos', todosRouter)

app.listen(config.PORT, (err) => {
    if (!err) {
        console.log('Servidor escuchando en el puerto: ' + config.PORT)
    }
});