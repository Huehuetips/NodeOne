const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const rankRoutes = require('./rankRoutes');
const permissionRoutes = require('./permissionRoutes');
const moduleRoutes = require('./moduleRoutes');
const sessionRoutes = require('./sessionRoutes');
const authRoutes = require('./authRoutes'); // Importar las rutas de autenticación

// Administrar las rutas de la API
router.use('/users', userRoutes);
router.use('/ranks', rankRoutes);
router.use('/permissions', permissionRoutes);
router.use('/modules', moduleRoutes);
router.use('/sessions', sessionRoutes);
router.use('/auth', authRoutes); // Usar las rutas de autenticación

module.exports = router;
