const db = require('../config/database');
const moment = require('moment');

class Rank {
    constructor(id, nameRank, createUserId = 1, writeUserId = 1, createdAtRank, writedAtRank) {
        this._id = id;
        this._nameRank = nameRank;
        this._createUserId = createUserId;
        this._writeUserId = writeUserId;
        this._createdAtRank = moment(createdAtRank).format('DD-MM-YYYY HH:mm:ss');
        this._writedAtRank = moment(writedAtRank).format('DD-MM-YYYY HH:mm:ss');
    }

    // Getters and Setters
    get id() {
        return this._id;
    }

    get nameRank() {
        return this._nameRank;
    }

    get createUserId() {
        return this._createUserId;
    }

    get writeUserId() {
        return this._writeUserId;
    }

    get createdAtRank() {
        return this._createdAtRank;
    }

    get writedAtRank() {
        return this._writedAtRank;
    }

    set id(value) {
        this._id = value;
    }

    set nameRank(value) {
        this._nameRank = value;
    }

    set createUserId(value) {
        this._createUserId = value;
    }

    set writeUserId(value) {
        this._writeUserId = value;
    }

    set createdAtRank(value) {
        this._createdAtRank = moment(value).format('DD-MM-YYYY HH:mm:ss');
    }

    set writedAtRank(value) {
        this._writedAtRank = moment(value).format('DD-MM-YYYY HH:mm:ss');
    }

    static getAllRanks(callback) {
        db.query('CALL getAllRanks()', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const ranks = results[0].map(row => new Rank(row.id, row.nameRank, row.createUserId, row.writeUserId, row.createdAtRank, row.writedAtRank));
            callback(null, ranks);
        });
    }

    static getRankById(id, callback) {
        db.query('CALL readRank(?)', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const row = results[0][0];
            const rank = new Rank(row.id, row.nameRank, row.createUserId, row.writeUserId, row.createdAtRank, row.writedAtRank);
            callback(null, rank);
        });
    }

    static getRanksByPage(limit, offset, callback) {
        db.query('CALL getRanksByPage(?, ?)', [limit, offset], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const ranks = results[0].map(row => new Rank(row.id, row.nameRank, row.createUserId, row.writeUserId, row.createdAtRank, row.writedAtRank));
            callback(null, ranks);
        });
    }

    save(callback) {
        if (this.id) {
            db.query('CALL updateRank(?, ?, ?)', [this.id, this.nameRank, this.writeUserId], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        } else {
            db.query('CALL createRank(?, ?, ?)', [this.nameRank, this.createUserId, this.writeUserId], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                this.id = results.insertId;
                callback(null, results);
            });
        }
    }

    static deleteRank(id, callback) {
        db.query('CALL deleteRank(?)', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static searchRankByName(name, callback) {
        db.query('CALL searchRankByName(?)', [name], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const ranks = results[0].map(row => new Rank(row.id, row.nameRank, row.createUserId, row.writeUserId, row.createdAtRank, row.writedAtRank));
            callback(null, ranks);
        });
    }
}

module.exports = Rank;