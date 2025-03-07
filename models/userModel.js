const db = require('../config/database');

class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static getAllUsers(callback) {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getUserById(id, callback) {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    }

    // ...other methods for creating, updating, and deleting users...
}

module.exports = User;
