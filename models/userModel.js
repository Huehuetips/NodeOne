const db = require('../config/database');

exports.getAll = (callback) => {
    db.query('SELECT * FROM Usuarios', (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

exports.create = (user, callback) => {
    const { nombre, email, password, rol_id } = user;
    db.query('INSERT INTO Usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)', 
        [nombre, email, password, rol_id], 
        (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        }
    );
};