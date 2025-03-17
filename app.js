const express = require('express');
const sequelize = require('./config/database');
const models = require('./models');
const app = express();
const apiRoutes = require('./routes/api');
const frontendRoutes = require('./routes/frontend');
const expressLayouts = require('express-ejs-layouts');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Importar cookie-parser
const { configureMorgan, configureSession, configureJwt } = require('./config/middleware');
const authMiddleware = require('./middlewares/authMiddleware'); // Importar el middleware de autenticación
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
app.use(cookieParser()); // Usar cookie-parser

// Configurar morgan
configureMorgan(app);

// Configurar sesión
configureSession(app);

// Configurar JWT
configureJwt(jwt);

// Permitir el acceso a la ruta de inicio de sesión sin autenticación
app.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Chat App', layout: 'layouts/clean' });
});

// Aplicar el middleware de autenticación a todas las rutas de la API
app.use('/api', authMiddleware.authenticateToken, apiRoutes);

// Aplicar el middleware de autenticación a todas las rutas del frontend
app.use('/', authMiddleware.authenticateToken, frontendRoutes);

// Manejar rutas no definidas (404)
app.use((req, res, next) => {
    res.status(404).render('404', { title: '404 - Not Found', layout: 'layouts/clean' });
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.APP_PORT}`);
});

module.exports = app;
