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

Recordemos que CORS es una protección de las APIS que estas se ponen por defecto para evitar que les realicen peticiones desde cualquier frontend.

```
npm install cors
```

Añadimos el middleware para quitar la protección:

```javascript
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const cors = require("cors");
const app = express(); // nos permite crear el servidor

mongoose.connect(
	`mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster0.vcqck.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`
);

app.use(cors()); // <===

// Podemos aplicarlo también solo para ciertas rutas:
app.use("/users", cors());

app.use(express.json());
```

Lo podemos configurar:

```javascript
// Access-Control-Allow-Origin: *
if (config.DB_USER === "dev") {
	app.use(cors());
}

if (config.NODE_ENV == "prod") {
	app.use(
		cors({
			origin: ["https://eoi.com"],
			methods: ["GET", "POST"],
		})
	);
}
```

Más info: https://www.npmjs.com/package/cors

## Middlewares

Un middleware (en ExpressJS) es una función que se va ejecutar antes que otra. Cuando se ejecuta decide si le toca a la siguiente o no.

```javascript
app.use((req, res, next) => {
	console.log(`Hemos recibido una solicitud a ${req.url}`);
	next();
});
```

Es importante tener en cuenta que en ExpressJS el orden de las "cosas" influye. Por ejemplo:

```javascript
let variable = 3;

// Esta es la primera función que se va a ejecutar cuando hacemos un get a '/status'
app.get("/status", (req, res, next) => {
	variable++;

	// Permite ejecutar la función que viene a continuación
	next();
});

app.get("/status", (req, res, next) => {
	variable++;

	if (!req.body) {
		return res.sendStatus(400).send("No se aceptan peticiones sin body");
	} else {
		// Permite ejecutar la función que viene a continuación
		next();
	}
});

app.get("/status", (req, res) => {
	variable++;
	res.send("" + variable);
});

// Cuando hacemos un get a '/status' es evidente que aquí no va a entrar
app.get("/users", (req, res) => {
	res.send("Homer");
});
```

Hay que tener cuidado con:

```javascript
app.get("/status", (req, res, next) => {
	variable++;

	if (!req.body) {
		return res.sendStatus(400).send("No se aceptan peticiones sin body");
	} else {
		res.send("vamos bien");
		next();
	}
});

app.get("/status", (req, res, next) => {
	variable++;

	res.send("vamos bien");
	next();
});

app.get("/status", (req, res) => {
	res.send("" + variable);
});
```

Si hacemos eso tendremos un error (`Cannot set headers after they are sent to the client`) porque no se permite volver a responder un `res` que ya ha sido respondido. No podemos responder dos veces a la API (salvo que utilicemos otros métodos).

Cuando usamos middlewares lo habitual es usarlo con `app.use(middleware)` porque de esta manera se le aplica a todas las peticiones sin importar el verbo (GET, POST, PUT, ...).

Por ejemplo:

```javascript
// Para todas las rutas:
app.use("*", (req, res, next) => {});

// Para las rutas que apuntan a '/status'
app.use("/status", (req, res, next) => {
	if (true) {
		return res.sendStatus(403).json("you shall not pass");
	}
});
```

Recordemos que ¡el orden importa!

```javascript
app.use(express.json());

// Aquí mal D:
// app.use('/api/users', usersRouter);

app.use((req, res, next) => {
	console.log(`Yo me ejecuto primero`);
	req.invalidUser = true;
	next();
});
app.use((req, res, next) => {
	console.log(`Y luego yo`);
	if (req.invalidUser) return res.sendStatus(401);
	else next();
});

// Aquí bien :)
app.use("/api/users", usersRouter);
```

Aquí podemos encontrar una lista de recursos y de middlewares útiles para ExpressJS: https://github.com/rajikaimal/awesome-express

-   Autenticar usuarios con redes sociales: [PassportJS](http://www.passportjs.org/)
-   Comprimir response bodies: [compression](https://www.npmjs.com/package/compression)

## JWT

https://jwt.io/

Token JWT, nos permite:

-   Saber si el token lo hemos generado nosotros con la palabra secreta
-   Conocer la información que almacena
-   Identifican al usuario.

Tiene tres partes:

1. Header: Algorithm & Token Type
2. Payload: Data
3. Verify signature

### Register

**`POST api/auth/signup - { username, email, role, password }`**

```javascript
const bcrypt = require('bcrypt');

app.post('/register', async function (req, res) {
  let body = req.body;
  let { username, email, password } = body;
  const newUser = await UserModel.create({
    username,
    email,
    password: bcrypt.hashSync(password, 10)
  });
  delete newUser.password; // No funciona para objetos de mongoose
  return res.json(newUser);
}
```

### Login

**`POST api/auth/signin { email, password }`**

El primer paso es comprobar la existencia del usuario en la DB:

```javascript
function signIn(req, res) {
	// Compare a password to a hash
	bcrypt.compare(password, hash, function (err, result) {
		// returns result
	});

	Usuario.findOne({ email: req.body.email })
		.then((usuarioDB) => {

			// Verifica que exista un usuario con el mail escrito por el usuario.
			if (!usuarioDB) {
				return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
			}

			// Valida que la contraseña escrita por el usuario, sea la almacenada en la db
			if (!bcrypt.compareSync(req.body.password, usuarioDB.password)) {
				return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
			}
        }

        // ...
}
```

Luego, usamos el método `jsonwebtoken.sign()` para generar el JWT

```javascript
    ({
            // Genera el token de autenticación
			let token = jwt.sign({ usuario: usuarioDB }, config.SECRET);

			res.json({
				usuario: usuarioDB,
				token,
			});
		})
		.catch((erro) => {
			return res.status(500).json(erro);
		});
```

Ver: `auth.controller.js`