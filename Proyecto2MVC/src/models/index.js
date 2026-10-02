const sequelize = require('../config/database'); // Importar la instancia de Sequelize desde el archivo de configuración de la base de datos
const User = require('./user.model'); // Importar el modelo de usuario
const Book = require('./book.model'); // Importar el modelo de libro

module.exports = { // Exportar los modelos para su uso en otros archivos
    sequelize, // Exportar la instancia de Sequelize
    User, // Exportar el modelo de usuario
    Book, // Exportar el modelo de libro
};