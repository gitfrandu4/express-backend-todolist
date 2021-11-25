// 1. Importamos mongoose
const mongoose = require("mongoose");

// 2. Aquí definimos el esquema de un todo
const schema = new mongoose.Schema(
	{
		name: {
			required: true,
			type: String,
			minlength: 5,
			maxlength: 255,
		},
		cardId: {
			required: true,
			type: String,
			validate: {
				validator: function (dni) {
					var DNI_REGEX = /^(\d{8})([A-Z])$/; // regex: 8 números + letra
					dni = dni.toUpperCase().replace(/\s/, ""); // borra espacios en blanco

					// Comprueba que la letra es correcta
					var validDNI = function (dni) {
						var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
						var letter = dni_letters.charAt(parseInt(dni, 10) % 23);

						return letter == dni.charAt(8);
					};
					// Check formato y letra
					if (!DNI_REGEX.test(dni) || !validDNI(dni)) {
						return false;
					}

					return true;
				},
				message: "El DNI no es válido",
			},
		},
		email: {
			required: true,
			type: String,
			minlength: 5,
			maxlength: 100,
			unique: true,
		},
        password: {
            required: true,
            type: String
        }
	},
	{ timestamps: true }
);

// 3.
// todo => nombre del recurso que podemos guardar en la bd
const USERmodel = mongoose.model("user", schema);

// 4. Exportamos el modelo
module.exports = USERmodel;
