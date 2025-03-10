const db = require('../config/database');

class User {
    constructor(id, name, user, email, password, enable = 1) {
        this._id = id;
        this._name = name;
        this._user = user;
        this._email = email;
        this._password = password;
        this._enable = enable;
    }

    // Getters
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get user() {
        return this._user;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get enable() {
        return this._enable;
    }

    // Setters
    set id(value) {
        this._id = value;
    }

    set name(value) {
        this._name = value;
    }

    set user(value) {
        this._user = value;
    }

    set email(value) {
        this._email = value;
    }

    set password(value) {
        this._password = value;
    }

    set enable(value) {
        this._enable = value;
    }

    static getAllUsers(callback) {
        db.query('CALL getAllUsers()', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    }

    static getUserById(id, callback) {
        db.query('CALL readUser(?)', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0][0]);
        });
    }

    save(callback) {
        if (this.id) {
            db.query('CALL updateUser(?, ?, ?, ?)', [this.id, this.name, this.user, this.email], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        } else {
            db.query('CALL createUser(?, ?, ?, ?)', [this.name, this.user, this.email, this.password], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                this.id = results.insertId;
                callback(null, results);
            });
        }
    }

    static deleteUser(id = this.id, callback) {
        db.query('CALL deleteUser(?)', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static searchUserByName(name = this.name, callback) {
        db.query('CALL searchUserByName(?)', [name], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    }

    static getUsersByPage(limit, offset, callback) {
        db.query('CALL getUsersByPage(?, ?)', [limit, offset], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]);
        });
    }

    static disableUser(id, callback) {
        db.query('CALL disableUser(?)', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
}

module.exports = User;
