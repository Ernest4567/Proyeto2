const pool = require('../config/database');

const ClientModel = {
    // Obtener todos los clientes
    findAll: async () => {
        const result = await pool.query('SELECT * FROM client_records');
        return result.rows;
    },

    // Buscar un solo registro por ID
    findById: async (id) => {
        const result = await pool.query('SELECT * FROM client_records WHERE id = $1', [id]);
        return result.rows[0];
    },

    // Buscar un solo registro por Username
    findByUsername: async (username) => {
        const result = await pool.query('SELECT * FROM client_records WHERE username = $1', [username]);
        return result.rows[0];
    },

    // Crear un nuevo cliente
    create: async (data) => {
        const { username, payment_status, comission_status, deadline } = data;
        const result = await pool.query(
            'INSERT INTO client_records (username, payment_status, comission_status, deadline) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, payment_status, comission_status, deadline]
        );
        return result.rows[0];
    },

    // Actualización completa (PUT)
    update: async (id, data) => {
        const { username, payment_status, comission_status, deadline } = data;
        const result = await pool.query(
            'UPDATE client_records SET username = $1, payment_status = $2, comission_status = $3, deadline = $4 WHERE id = $5 RETURNING *',
            [username, payment_status, comission_status, deadline, id]
        );
        return result;
    },

    // Actualización parcial (PATCH) dinámicamente segura
    updatePartial: async (id, data) => {
        // Lista blanca de campos permitidos en la base de datos para prevenir SQL Injection
        const allowedFields = ['username', 'payment_status', 'comission_status', 'deadline'];
        const updates = [];
        const values = [];

        let paramIndex = 1;
        for (const [key, value] of Object.entries(data)) {
            if (allowedFields.includes(key) && value !== undefined) {
                updates.push(`${key} =$${paramIndex}`);
                values.push(value);
                paramIndex++;
            }
        }

        // Si no se proporcionó ningún campo válido para actualizar
        if (updates.length === 0) {
            return { empty: true };
        }

        values.push(id);
        const query = `UPDATE client_records SET ${updates.join(', ')} WHERE id =$${paramIndex} RETURNING *`;
        
        const result = await pool.query(query, values);
        return result;
    },

    // Eliminar cliente por ID
    delete: async (id) => {
        const result = await pool.query('DELETE FROM client_records WHERE id = $1', [id]);
        return result;
    }
};

module.exports = ClientModel;