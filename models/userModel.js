const db = require('../config/database');
const moment = require('moment');

class User {
    constructor(id, rankId, nameUser, user, email, password, enable = 1, createUserId = 1, writeUserId = 1, createdAtUser, writedAtUser) {
        this._id = id;
        this._rankId = rankId;
        this._nameUser = nameUser;
        this._user = user;
        this._email = email;
        this._password = password;
        this._enable = enable;
        this._createUserId = createUserId;
        this._writeUserId = writeUserId;
        this._createdAtUser = moment(createdAtUser).format('DD-MM-YYYY HH:mm:ss');
        this._writedAtUser = moment(writedAtUser).format('DD-MM-YYYY HH:mm:ss');
    }

    // Getters
    get id() {
        return this._id;
    }

    get nameUser() {
        return this._nameUser;
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

    get createUserId() {
        return this._createUserId;
    }

    get writeUserId() {
        return this._writeUserId;
    }

    get createdAtUser() {
        return this._createdAtUser;
    }

    get writedAtUser() {
        return this._writedAtUser;
    }

    // Setters
    set id(value) {
        this._id = value;
    }

    set nameUser(value) {
        this._nameUser = value;
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

    set createUserId(value) {
        this._createUserId = value;
    }

    set writeUserId(value) {
        this._writeUserId = value;
    }

    set createdAtUser(value) {
        this._createdAtUser = moment(value).format('DD-MM-YYYY HH:mm:ss');
    }

    set writedAtUser(value) {
        this._writedAtUser = moment(value).format('DD-MM-YYYY HH:mm:ss');
    }

    static getAllUsers(callback) {
        db.query('CALL getAllUsers()', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const users = results[0].map(row => new User(row.id, row.rankId, row.nameUser, row.userUser, row.emailUser, row.passwordUser, row.enableUser, row.createUserId, row.writeUserId, row.createdAtUser, row.writedAtUser));
            callback(null, users);
        });
    }

    static getUserById(id = this.id, callback) {
        // console.log(id);
        db.query('CALL readUser(?)', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const row = results[0][0];
            const user = new User(row.id, row.rankId, row.nameUser, row.userUser, row.emailUser, row.passwordUser, row.enableUser, row.createUserId, row.writeUserId, row.createdAtUser, row.writedAtUser);
            callback(null, user);
        });
    }

    save(callback) {
        if (this.id) {
            db.query('CALL updateUser(?, ?, ?, ?, ?, ?)', [this.id, this.nameUser, this.user, this.email, this.rankId, this.writeUserId], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        } else {
            db.query('CALL createUser(?, ?, ?, ?, ?, ?, ?)', [this.nameUser, this.user, this.email, this.password, this.rankId, this.createUserId, this.writeUserId], (err, results) => {
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

    static searchUserByName(name  = this.name, callback) {
        db.query('CALL searchUserByName(?)', [name], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const users = results[0].map(row => new User(row.id, row.rankId, row.nameUser, row.userUser, row.emailUser, row.passwordUser, row.enableUser, row.createUserId, row.writeUserId, row.createdAtUser, row.writedAtUser));
            callback(null, users);
        });
    }

    static getUsersByPage(limit, offset, callback) {
        db.query('CALL getUsersByPage(?, ?)', [limit, offset], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const users = results[0].map(row => new User(row.id, row.rankId, row.nameUser, row.userUser, row.emailUser, row.passwordUser, row.enableUser, row.createUserId, row.writeUserId, row.createdAtUser, row.writedAtUser));
            callback(null, users);
        });
    }

    static disableUser(id  = this.id, callback) {
        db.query('CALL disableUser(?)', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
}

module.exports = User;
