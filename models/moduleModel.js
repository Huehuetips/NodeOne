const db = require('../config/database');
const moment = require('moment');

class Module {
    constructor(id, nameModule, descriptionModule, createdAtModule, writedAtModule) {
        this._id = id;
        this._nameModule = nameModule;
        this._descriptionModule = descriptionModule;
        this._createdAtModule = moment(createdAtModule).format('DD-MM-YYYY HH:mm:ss');
        this._writedAtModule = moment(writedAtModule).format('DD-MM-YYYY HH:mm:ss');
    }

    // Getters and Setters
    get id() {
        return this._id;
    }

    get nameModule() {
        return this._nameModule;
    }

    get descriptionModule() {
        return this._descriptionModule;
    }

    get createdAtModule() {
        return this._createdAtModule;
    }

    get writedAtModule() {
        return this._writedAtModule;
    }

    set id(value) {
        this._id = value;
    }

    set nameModule(value) {
        this._nameModule = value;
    }

    set descriptionModule(value) {
        this._descriptionModule = value;
    }

    set createdAtModule(value) {
        this._createdAtModule = moment(value).format('DD-MM-YYYY HH:mm:ss');
    }

    set writedAtModule(value) {
        this._writedAtModule = moment(value).format('DD-MM-YYYY HH:mm:ss');
    }

    static getAllModules(callback) {
        db.query('CALL getAllModules()', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const modules = results[0].map(row => new Module(row.id, row.nameModule, row.descriptionModule, row.createdAtModule, row.writedAtModule));
            callback(null, modules);
        });
    }

    static getModuleById(id, callback) {
        db.query('CALL readModule(?)', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const row = results[0][0];
            const module = new Module(row.id, row.nameModule, row.descriptionModule, row.createdAtModule, row.writedAtModule);
            callback(null, module);
        });
    }

    save(callback) {
        if (this.id) {
            db.query('CALL updateModule(?, ?, ?)', [this.id, this.nameModule, this.descriptionModule], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        } else {
            db.query('CALL createModule(?, ?)', [this.nameModule, this.descriptionModule], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                this.id = results.insertId;
                callback(null, results);
            });
        }
    }

    static deleteModule(id, callback) {
        db.query('CALL deleteModule(?)', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static searchModuleByName(name, callback) {
        db.query('CALL searchModuleByName(?)', [name], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const modules = results[0].map(row => new Module(row.id, row.nameModule, row.descriptionModule, row.createdAtModule, row.writedAtModule));
            callback(null, modules);
        });
    }

    static getModulesByPage(limit, offset, callback) {
        db.query('CALL getModulesByPage(?, ?)', [limit, offset], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const modules = results[0].map(row => new Module(row.id, row.nameModule, row.descriptionModule, row.createdAtModule, row.writedAtModule));
            callback(null, modules);
        });
    }
}

module.exports = Module;