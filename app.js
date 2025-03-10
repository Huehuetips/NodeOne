const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const frontendRoutes = require('./routes/frontend');
const expressLayouts = require('express-ejs-layouts');
const jwt = require('jsonwebtoken');
const { configureMorgan, configureSession, configureJwt } = require('./config/middleware');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

// Configurar vistas y layouts
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middleware
app.use(express.json()); // Middleware para analizar JSON
app.use(express.urlencoded({ extended: true })); // Middleware para analizar datos de formularios
app.use(express.static('public'));

// Configurar morgan
configureMorgan(app);

// Configurar sesión
configureSession(app);

// Configurar JWT
configureJwt(jwt);

// Usar las rutas de la API y del frontend
app.use('/api', apiRoutes);
app.use('/', frontendRoutes);

// Manejar rutas no definidas (404)
app.use((req, res, next) => {
    res.status(404).render('404', { title: '404 - Not Found' , layout : 'layouts/clean' });
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
