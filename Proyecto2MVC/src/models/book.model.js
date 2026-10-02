const { DataTypes } = require('sequelize'); // Importar DataTypes de Sequelize para definir los tipos de datos de los campos del modelo
const sequelize = require('../config/database'); // Importar la instancia de Sequelize desde el archivo de configuración de la base de datos

const Book = sequelize.define('Book', { // Definir el modelo de libro con sus campos y tipos de datos
    id: {
        type: DataTypes.UUID, // Tipo de dato UUID para el campo id
        defaultValue: DataTypes.UUIDV4, // Valor por defecto generado automáticamente como UUID versión 4
        primaryKey: true, // Establecer el campo id como clave primaria
    },
    title: {
        type: DataTypes.STRING, // Tipo de dato STRING para el campo title
        allowNull: false, // No permitir valores nulos en el campo title
    },
    author: {
        type: DataTypes.STRING, // Tipo de dato STRING para el campo author
        allowNull: false, // No permitir valores nulos en el campo author
    },
    isbn: {
        type: DataTypes.STRING, // Tipo de dato STRING para el campo isbn
        allowNull: false, // No permitir valores nulos en el campo isbn
        unique: true, // Establecer el campo isbn como único para evitar duplicados
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // Tipo de dato DECIMAL para el campo price
        allowNull: false, // No permitir valores nulos en el campo price
        validate: { min: 0 }, // Validar que el valor del campo price sea mayor o igual a 0
    },
    stock: {
        type: DataTypes.INTEGER, // Tipo de dato INTEGER para el campo stock
        allowNull: false, // No permitir valores nulos en el campo stock
        validate: { min: 0 }, // Validar que el valor del campo stock sea mayor o igual a 0
    }
},{
    timestamps: true, // Habilitar la creación automática de campos createdAt y updatedAt
});