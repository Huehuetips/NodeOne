const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

// Administrar las rutas del frontend
router.get('/', (req, res) => {
    res.render('index', { title: 'Chat App' });
});
router.get('/about', (req, res) => {
    res.render('about', { title: 'Chat App' });
});
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Chat App' });
});
router.use('/users', userRoutes);

module.exports = router;
