const express = require('express');
const router = express.Router();
const {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    updateRolePartial,
    deleteRole
} = require('../controllers/roleController');

// Rutas de Lectura
router.get('/', getRoles);
router.get('/id/:id', getRoleById);

// Rutas de Escritura / Modificación
router.post('/', createRole);
router.put('/:id', updateRole);         
router.patch('/:id', updateRolePartial); 
router.delete('/:id', deleteRole);

module.exports = router;