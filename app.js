const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan'); // Importar morgan
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Importar y configurar dotenv

// Crear un formato de log personalizado
morgan.token('date', function() {
    return new Date().toISOString().split('T')[0];
});
morgan.token('time', function() {
    return new Date().toISOString().split('T')[1];
});
morgan.token('host', function(req) {
    return req.hostname;
});
morgan.token('id', function getId(req) {
    return req.id;
});
morgan.token('level', function(req, res) {
    if (res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    if (res.statusCode >= 100) return 'debug';
    return 'info';
});
const customFormat = ':date :time :id :level :method :url :status :response-time ms :res[content-length]';

// Crear un stream de escritura para el archivo de logs
const logStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Configura un layout predeterminado

app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos desde el directorio 'public'

// Usar morgan con el formato de log personalizado y guardar en archivo y consola
app.use(morgan(customFormat, { stream: logStream }));
app.use(morgan(customFormat));

// Configurar la sesión usando variables de entorno
const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Configurar JWT usando variables de entorno
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Chat App' }); // Usar layout predeterminado
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
