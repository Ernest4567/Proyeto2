const express = require('express');
const cors = require('cors');
require('dotenv').config();

const clientRoutes = require('./routes/clientRoutes');
const roleRoutes = require('./routes/roleRoutes'); // <-- CAMBIO AQUÍ

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/test', clientRoutes);
app.use('/test/roles', roleRoutes); // <-- CAMBIO AQUÍ

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});