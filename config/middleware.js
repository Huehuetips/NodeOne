const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

function configureMorgan(app) {
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
    const logStream = fs.createWriteStream(path.join(__dirname, '../logs', 'access.log'), { flags: 'a' });

    // Usar morgan con el formato de log personalizado y guardar en archivo y consola
    app.use(morgan(customFormat, { stream: logStream }));
    app.use(morgan(customFormat));
}

function configureSession(app) {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: process.env.NODE_ENV === 'production' }
    }));
}

function configureJwt(jwt) {
    const jwtSecret = process.env.JWT_SECRET;
    // Configuración adicional de JWT si es necesario
}

module.exports = {
    configureMorgan,
    configureSession,
    configureJwt
};
