# express-backend-todolist

## Primeros pasos

Añadir package.json

```
npm init
```

Instalar dependencias:

```
npm i express
```

ORM Mongoose:
```
npm i mongoose
```

Variables de entorno con Node.js: https://www.victorvr.com/tutorial/variables-de-entorno-con-nodejs

## CORS

```
npm install cors
```

Añadimos el middleware para quitar la protección:

```javascript
const express = require('express');
const mongoose = require('mongoose')
const config = require('./config');
const cors = require('cors')
const app = express();

mongoose.connect(`mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster0.vcqck.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`);

app.use(cors()) // <===

app.use(express.json())

```

Lo podemos configurar:

```javascript

// Access-Control-Allow-Origin: *
if ( config.DB_USER === 'dev') {
    app.use(cors()) 
} 

if ( config.NODE_ENV == 'prod' ){
    app.use(cors({
        origin: ['https://eoi.com'],
        methods: ['GET', 'POST']
    })) 
}

```

Más info: https://www.npmjs.com/package/cors
