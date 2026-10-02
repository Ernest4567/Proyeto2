const ClientModel = require('../models/clientModel');

// Utilidad simple para logs formateados según estándares
const logAction = (type, message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${type}] ${message}`); };  const getClients = async (req, res) => {     try {         const clients = await ClientModel.findAll();         logAction('INFO', `Consulta realizada: ${clients.length} clientes recuperados.`);
        res.json(clients);
    } catch (error) {
        logAction('ERROR', `Error al consultar todos los clientes: ${error.message}`);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Obtener cliente por ID
const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await ClientModel.findById(id);

        if (!client) {
            logAction('WARN', `Cliente no encontrado con ID: ${id}`);
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        logAction('SUCCESS', `Cliente recuperado con éxito (ID: ${id})`);
        res.status(200).json(client);
    } catch (error) {
        logAction('ERROR', `Error al obtener cliente por ID ${req.params.id}:${error.message}`);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Obtener cliente por Username
const getClientByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const client = await ClientModel.findByUsername(username);

        if (!client) {
            logAction('WARN', `Cliente no encontrado con Username: ${username}`);
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        logAction('SUCCESS', `Cliente recuperado con éxito (Username: ${username})`);
        res.status(200).json(client);
    } catch (error) {
        logAction('ERROR', `Error al obtener cliente por Username ${req.params.username}:${error.message}`);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

const createClient = async (req, res) => {
    try {
        const newClient = await ClientModel.create(req.body);
        logAction('SUCCESS', `Nuevo cliente registrado con ID: ${newClient.id}`);
        res.status(201).json(newClient);
    } catch (error) {
        logAction('ERROR', `Error al crear cliente: ${error.message}`);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ClientModel.update(id, req.body);

        if (result.rowCount === 0) {
            logAction('WARN', `Intento de actualización PUT fallido (ID inexistente: ${id})`);
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        logAction('SUCCESS', `Cliente actualizado completamente (PUT - ID: ${id})`);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        logAction('ERROR', `Error al actualizar (PUT) cliente ${req.params.id}:${error.message}`);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Actualización parcial (PATCH)
const updateClientPartial = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ClientModel.updatePartial(id, req.body);

        // Validación si no envió nada o envió campos no permitidos
        if (result.empty) {
            logAction('WARN', `Intento de PATCH en ID ${id} sin campos válidos en el body.`);
            return res.status(400).json({ error: 'No se enviaron campos válidos para actualizar' });
        }

        if (result.rowCount === 0) {
            logAction('WARN', `Intento de actualización PATCH fallido (ID inexistente: ${id})`);
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        logAction('SUCCESS', `Campos actualizados parcialmente (PATCH - ID: ${id})`);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        logAction('ERROR', `Error al actualizar (PATCH) cliente ${req.params.id}:${error.message}`);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ClientModel.delete(id);

        if (result.rowCount === 0) {
            logAction('WARN', `Intento de eliminación fallido (ID inexistente: ${id})`);
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        logAction('SUCCESS', `Cliente eliminado correctamente de la BD (ID: ${id})`);
        res.status(204).send();
    } catch (error) {
        logAction('ERROR', `Error al eliminar cliente ${req.params.id}:${error.message}`);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

module.exports = {
    getClients,
    getClientById,
    getClientByUsername,
    createClient,
    updateClient,
    updateClientPartial,
    deleteClient
};