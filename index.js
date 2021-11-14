const express = require('express');
const app = express();

// app.get('/', (req, res) => {
//     return res.send('hola');
// }) 

app.get('/todos', (req, res) => {
    return res.json([])
})

app.get('/todos/:id', (req, res) => {
    return res.json([])
})

app.post('/todos', (req, res) => {
    return res.json([])
})

app.delete('/todos/:id', (req, res) => {
    return res.json([])
})

app.patch('/todos/:id', (req, res) => {
    return res.json([])
})

app.listen(5000, (err) => {
    if (!err) {
        console.log('Servidor escuchando en el puerto 5000')
    }
});