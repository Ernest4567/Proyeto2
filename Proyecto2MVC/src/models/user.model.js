const { DataTypes } = require('sequelize'); // Importar DataTypes de Sequelize para definir los tipos de datos de los campos del modelo
const sequelize = require('../config/database'); // Importar la instancia de Sequelize desde el archivo de configuración de la base de datos
const bcrypt = require('bcrypt'); // Importar bcrypt para el hash de contraseñas

const User = sequelize.define('User', { // Definir el modelo de usuario con sus campos y tipos de datos
    id: {
        type: DataTypes.UUID, // Tipo de dato UUID para el campo id
        defaultValue: DataTypes.UUIDV4, // Valor por defecto generado automáticamente como UUID versión 4
        primaryKey: true, // Establecer el campo id como clave primaria
    },
    name: {
        type: DataTypes.STRING, // Tipo de dato STRING para el campo name
        allowNull: false, // No permitir valores nulos en el campo name
    },
    email: {
        type: DataTypes.STRING, // Tipo de dato STRING para el campo email
        allowNull: false, // No permitir valores nulos en el campo email
        unique: true, // Establecer el campo email como único para evitar duplicados
        validate: { isEmail: true }, // Validar que el valor del campo email sea un correo electrónico válido
    },
    password: {
        type: DataTypes.STRING, // Tipo de dato STRING para el campo password
        allowNull: false, // No permitir valores nulos en el campo password
    },
    role: {
        type: DataTypes.ENUM('ADMIN', 'CLIENT'), // Tipo de dato ENUM para el campo role con valores posibles 'user' y 'admin'
        defaultValue: 'CLIENT', // Valor por defecto para el campo role
    }
},{
    timestamps: true, // Habilitar la creación automática de campos createdAt y updatedAt
    hooks: {
        beforeCreate: async (user) => { // Hook que se ejecuta antes de crear un nuevo usuario
            const salt = await bcrypt.genSalt(10); // Generar un salt para el hash de la contraseña
            user.password = await bcrypt.hash(user.password, salt); // Hashear la contraseña del usuario antes de guardarla en la base de datos
        },
    },
});

User.prototype.validatePassword = async function (password) { // Método para validar la contraseña ingresada por el usuario
    return await bcrypt.compare(password, this.password); // Comparar la contraseña ingresada con la contraseña hasheada almacenada en la base de datos
}

module.exports = User; // Exportar el modelo de usuario para su uso en otros archivos