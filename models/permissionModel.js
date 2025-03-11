const db = require('../config/database');
const moment = require('moment');

class Permission {
    constructor(id, moduleId, namePermission, createUserId = 1, writeUserId = 1, createdAtPermission, writedAtPermission) {
        this._id = id;
        this._moduleId = moduleId;
        this._namePermission = namePermission;
        this._createUserId = createUserId;
        this._writeUserId = writeUserId;
        this._createdAtPermission = moment(createdAtPermission).format('DD-MM-YYYY HH:mm:ss');
        this._writedAtPermission = moment(writedAtPermission).format('DD-MM-YYYY HH:mm:ss');
    }

    // Getters
    get id() {
        return this._id;
    }

    get moduleId() {
        return this._moduleId;
    }

    get namePermission() {
        return this._namePermission;
    }

    get createUserId() {
        return this._createUserId;
    }

    get writeUserId() {
        return this._writeUserId;
    }

    get createdAtPermission() {
        return this._createdAtPermission;
    }

    get writedAtPermission() {
        return this._writedAtPermission;
    }

    // Setters
    set id(value) {
        this._id = value;
    }

    set moduleId(value) {
        this._moduleId = value;
    }

    set namePermission(value) {
        this._namePermission = value;
    }

    set createUserId(value) {
        this._createUserId = value;
    }

    set writeUserId(value) {
        this._writeUserId = value;
    }

    set createdAtPermission(value) {
        this._createdAtPermission = moment(value).format('DD-MM-YYYY HH:mm:ss');
    }

    set writedAtPermission(value) {
        this._writedAtPermission = moment(value).format('DD-MM-YYYY HH:mm:ss');
    }

    static getAllPermissions(callback) {
        db.query('CALL getAllPermissions()', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const permissions = results[0].map(row => new Permission(row.id, row.moduleId, row.namePermission, row.createUserId, row.writeUserId, row.createdAtPermission, row.writedAtPermission));
            callback(null, permissions);
        });
    }

    static getPermissionById(id, callback) {
        db.query('CALL readPermission(?)', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const row = results[0][0];
            const permission = new Permission(row.id, row.moduleId, row.namePermission, row.createUserId, row.writeUserId, row.createdAtPermission, row.writedAtPermission);
            callback(null, permission);
        });
    }

    save(callback) {
        if (this.id) {
            db.query('CALL updatePermission(?, ?, ?, ?)', [this.id, this.namePermission, this.moduleId, this.writeUserId], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        } else {
            db.query('CALL createPermission(?, ?, ?, ?)', [this.namePermission, this.moduleId, this.createUserId, this.writeUserId], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                this.id = results.insertId;
                callback(null, results);
            });
        }
    }

    static deletePermission(id, callback) {
        db.query('CALL deletePermission(?)', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static searchPermissionByName(name, callback) {
        db.query('CALL searchPermissionByName(?)', [name], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const permissions = results[0].map(row => new Permission(row.id, row.moduleId, row.namePermission, row.createUserId, row.writeUserId, row.createdAtPermission, row.writedAtPermission));
            callback(null, permissions);
        });
    }

    static getPermissionsByPage(limit, offset, callback) {
        db.query('CALL getPermissionsByPage(?, ?)', [limit, offset], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const permissions = results[0].map(row => new Permission(row.id, row.moduleId, row.namePermission, row.createUserId, row.writeUserId, row.createdAtPermission, row.writedAtPermission));
            callback(null, permissions);
        });
    }
}

module.exports = Permission;