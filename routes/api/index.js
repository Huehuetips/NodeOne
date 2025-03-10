const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

// Administrar las rutas de la API
router.use('/users', userRoutes);

module.exports = router;
