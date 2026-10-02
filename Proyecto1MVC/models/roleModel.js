const pool = require('../config/database');

const RoleModel = {
    // Obtener todos los roles
    findAll: async () => {
        const result = await pool.query('SELECT * FROM roles');
        return result.rows;
    },

    // Buscar un rol por ID
    findById: async (id) => {
        const result = await pool.query('SELECT * FROM roles WHERE id = $1', [id]);
        return result.rows[0];
    },

    // Crear un nuevo rol
    create: async (data) => {
        const { name, descripcion } = data;
        const result = await pool.query(
            'INSERT INTO roles (name, descripcion) VALUES ($1, $2) RETURNING *',
            [name, descripcion]
        );
        return result.rows[0];
    },

    // Actualización completa (PUT)
    update: async (id, data) => {
        const { name, descripcion } = data;
        const result = await pool.query(
            'UPDATE roles SET name = $1, descripcion = $2 WHERE id = $3 RETURNING *',
            [name, descripcion, id]
        );
        return result;
    },

    // Actualización parcial (PATCH) dinámicamente segura
    updatePartial: async (id, data) => {
        // Lista blanca de campos permitidos
        const allowedFields = ['name', 'descripcion'];
        const updates = [];
        const values = [];

        let paramIndex = 1;
        for (const [key, value] of Object.entries(data)) {
            if (allowedFields.includes(key) && value !== undefined) {
                updates.push(`${key} = $${paramIndex}`);
                values.push(value);
                paramIndex++;
            }
        }

        if (updates.length === 0) {
            return { empty: true };
        }

        values.push(id);
        const query = `UPDATE roles SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
        
        const result = await pool.query(query, values);
        return result;
    },

    // Eliminar rol por ID
    delete: async (id) => {
        const result = await pool.query('DELETE FROM roles WHERE id = $1', [id]);
        return result;
    }
};

module.exports = RoleModel;