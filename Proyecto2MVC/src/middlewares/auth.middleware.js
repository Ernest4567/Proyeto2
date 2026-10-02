const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para la verificación de tokens JWT

const verifyToken = (req, res, next) => { // Middleware para la autenticación de usuarios mediante tokens JWT
    const authHeader = req.headers['authorization']; // Obtener el token JWT del encabezado de la solicitud
    const token = authHeader && authHeader.split(' ')[1]; // Extraer el token del encabezado
    if (!token){ // Si no hay token, devolver un error 401 (no autorizado)
        return res.status(401).json({ message: 'Acceso denegado' }); // Devolver un mensaje de error indicando que no se proporcionó un token
    }
    try { // Intentar verificar el token JWT
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token utilizando la clave secreta definida en las variables de entorno
        req.user = verified; // Almacenar la información del usuario decodificada en la solicitud para su uso posterior
        next(); // Pasar al siguiente middleware o controlador
    } catch (error) { // Si ocurre un error durante la verificación del token
        return res.status(403).json({ message: 'Token no valido o expirado' }); // Devolver un error 403 (prohibido) indicando que el token es inválido
    }
};

const checkRole = (role) => { // Middleware para verificar el rol del usuario
    return (req, res, next) => { // Retornar una función middleware que verifica el rol del usuario
        if (!req.user || req.user.role !== role) { // Si el usuario no está autenticado o su rol no coincide con el requerido
            return res.status(403).json({ message: 'Acceso denegado: Rol no autorizado' }); // Devolver un error 403 (prohibido) indicando que el acceso está denegado
        }
        next(); // Pasar al siguiente middleware o controlador si el rol es válido
    };
};

module.exports = { // Exportar las funciones de middleware para su uso en otros archivos
    verifyToken, // Exportar la función de verificación de token
    checkRole, // Exportar la función de verificación de rol
};
