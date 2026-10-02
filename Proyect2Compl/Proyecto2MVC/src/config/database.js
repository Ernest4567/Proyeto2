const { Sequelize } = require('sequelize'); 
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const sequelize = new Sequelize(
    process.env.DB_NAME, // Nombre de la base de datos
    process.env.DB_USER, // Usuario de la base de datos
    process.env.DB_PASSWORD, // Contraseña de la base de datos
    {
        host: process.env.DB_HOST, // Host de la base de datos
        port: process.env.DB_PORT, // Puerto de la base de datos
        dialect: 'postgres', // Tipo de base de datos (PostgreSQL)
        logging: false, // Desactivar el registro de consultas SQL en la consola
    }
);

module.exports = sequelize; // Exportar la instancia de Sequelize para su uso en otros archivos