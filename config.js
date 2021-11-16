const dotenv = require("dotenv").config({path: '.env'});

module.exports = {
	NODE_ENV: process.env.NODE_ENV || "development",
	HOST: process.env.HOST || "127.0.0.1",
	PORT: process.env.PORT || 3000,
	DB_USER: process.env.DB_USER || 'Homer',
	DB_PASSWORD: process.env.DB_PASSWORD || 'password',
	DB_NAME: process.env.DB_NAME || "todolistd"
};