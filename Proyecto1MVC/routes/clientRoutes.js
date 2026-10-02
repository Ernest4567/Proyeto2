const express = require('express');
const router = express.Router();
const {
    getClients,
    getClientById,
    getClientByUsername,
    createClient,
    updateClient,
    updateClientPartial,
    deleteClient
} = require('../controllers/clientController');

// Rutas de Lectura
router.get('/', getClients);
router.get('/id/:id', getClientById);
router.get('/username/:username', getClientByUsername);

// Rutas de Escritura / Modificación
router.post('/', createClient);
router.put('/:id', updateClient);         // Reemplazo total
router.patch('/:id', updateClientPartial); // Modificación parcial
router.delete('/:id', deleteClient);

module.exports = router;