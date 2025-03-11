const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const rankRoutes = require('./rankRoutes');
const permissionRoutes = require('./permissionRoutes');
const rankPermissionRoutes = require('./rankPermissionRoutes');
const moduleRoutes = require('./moduleRoutes');

// Administrar las rutas de la API
router.use('/users', userRoutes);
router.use('/ranks', rankRoutes);
router.use('/permissions', permissionRoutes);
router.use('/rank_permissions', rankPermissionRoutes);
router.use('/modules', moduleRoutes);

module.exports = router;
