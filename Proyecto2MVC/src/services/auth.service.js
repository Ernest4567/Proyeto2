const { User } = require('../models'); // Importar el modelo de usuario desde el archivo de modelos
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para la generación y verificación de tokens JWT

class AuthService { // Definir la clase AuthService para manejar la autenticación de usuarios
    static async registerUser(userData) { // Método estático para registrar un nuevo usuario
        const existingUser = await User.findOne({ where: { email: userData.email } }); // Buscar un usuario existente con el mismo correo electrónico
        if (existingUser) { // Si el usuario ya existe, lanzar un error
            throw new Error('El email ya está registrado!!!'); // Lanzar un error indicando que el correo electrónico ya está registrado
        }
        const newUser = await User.create(userData); // Crear un nuevo usuario en la base de datos con los datos proporcionados
        const {password, ...userWithoutPassword} = newUser.toJSON(); // Excluir la contraseña del objeto de usuario antes de devolverlo
        return userWithoutPassword; // Devolver el objeto de usuario sin la contraseña
    }
    static async loginUser(email, password) { // Método estático para iniciar sesión de un usuario
        const user = await User.findOne({ where: { email } }); // Buscar un usuario con el correo electrónico proporcionado
        if (!user) { // Si no se encuentra el usuario, lanzar un error
            throw new Error('Usuario no encontrado'); // Lanzar un error indicando que el usuario no fue encontrado
        }
        const isMatch = await user.validatePassword(password); // Validar la contraseña proporcionada con la almacenada en la base de datos
        if (!isMatch) { // Si la contraseña no coincide, lanzar un error
            throw new Error('Contraseña incorrecta'); // Lanzar un error indicando que la contraseña es incorrecta
        }
        const token = jwt.sign({ 
            id: user.id, 
            role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '10h' }); // Generar un token JWT con el id y rol del usuario
        return { 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email, 
                role: user.role 
            } 
        }; // Devolver el token y la información del usuario
    }
}