const RoleModel = require('../models/roleModel');

const logAction = (type, message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${type}] ${message}`); 
};

const getRoles = async (req, res) => {
    try {
        const roles = await RoleModel.findAll();
        logAction('INFO', `Consulta realizada: ${roles.length} roles recuperados.`);
        res.json(roles);
    } catch (error) {
        logAction('ERROR', `Error al consultar todos los roles: ${error.message}`);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await RoleModel.findById(id);

        if (!role) {
            logAction('WARN', `Rol no encontrado con ID: ${id}`);
            return res.status(404).json({ error: 'Rol no encontrado' });
        }

        logAction('SUCCESS', `Rol recuperado con éxito (ID: ${id})`);
        res.status(200).json(role);
    } catch (error) {
        logAction('ERROR', `Error al obtener rol por ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

const createRole = async (req, res) => {
    try {
        const newRole = await RoleModel.create(req.body);
        logAction('SUCCESS', `Nuevo rol registrado con ID: ${newRole.id}`);
        res.status(201).json(newRole);
    } catch (error) {
        logAction('ERROR', `Error al crear rol: ${error.message}`);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await RoleModel.update(id, req.body);

        if (result.rowCount === 0) {
            logAction('WARN', `Intento de actualización PUT fallido (ID inexistente: ${id})`);
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        logAction('SUCCESS', `Rol actualizado completamente (PUT - ID: ${id})`);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        logAction('ERROR', `Error al actualizar (PUT) rol ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

const updateRolePartial = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await RoleModel.updatePartial(id, req.body);

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
        logAction('ERROR', `Error al actualizar (PATCH) rol ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await RoleModel.delete(id);

        if (result.rowCount === 0) {
            logAction('WARN', `Intento de eliminación fallido (ID inexistente: ${id})`);
            return res.status(404).json({ error: 'Registro no encontrado' });
        }

        logAction('SUCCESS', `Rol eliminado correctamente de la BD (ID: ${id})`);
        res.status(204).send();
    } catch (error) {
        logAction('ERROR', `Error al eliminar rol ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

module.exports = {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    updateRolePartial,
    deleteRole
};