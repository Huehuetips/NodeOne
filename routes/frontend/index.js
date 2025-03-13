const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const rankRoutes = require('./rankRoutes');
const permissionRoutes = require('./permissionRoutes');
const moduleRoutes = require('./moduleRoutes');

// Administrar las rutas del frontend
router.use('/users', userRoutes);
router.use('/ranks', rankRoutes);
router.use('/permissions', permissionRoutes);
router.use('/modules', moduleRoutes);
router.get('/', (req, res) => {
    res.render('index', { title: 'Chat App' });
});
router.get('/about', (req, res) => {
    res.render('about', { title: 'Chat App' });
});
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Chat App' });
});

module.exports = router;
