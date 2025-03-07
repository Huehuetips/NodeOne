const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.get('/alternate', (req, res) => {
    res.render('index', { title: 'Alternate Chat App', layout: 'layouts/alternate' }); // Usar layout alternativo
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' }); // Usar layout predeterminado
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' }); // Usar layout predeterminado
});

router.get('/users-page', UserController.renderUsersPage); // Ruta para la vista de usuarios

// ...other routes for creating, updating, and deleting users...

module.exports = router;
