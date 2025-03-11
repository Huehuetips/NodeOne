const db = require('../config/database');
const moment = require('moment');

class RankPermission {
    constructor(rankId, permissionId, createUserId = 1, writeUserId = 1, createdAtRankPermission, writedAtRankPermission) {
        this._rankId = rankId;
        this._permissionId = permissionId;
        this._createUserId = createUserId;
        this._writeUserId = writeUserId;
        this._createdAtRankPermission = moment(createdAtRankPermission).format('DD-MM-YYYY HH:mm:ss');
        this._writedAtRankPermission = moment(writedAtRankPermission).format('DD-MM-YYYY HH:mm:ss');
    }

    // Getters and Setters
    get rankId() {
        return this._rankId;
    }

    get permissionId() {
        return this._permissionId;
    }

    get createUserId() {
        return this._createUserId;
    }

    get writeUserId() {
        return this._writeUserId;
    }

    get createdAtRankPermission() {
        return this._createdAtRankPermission;
    }

    get writedAtRankPermission() {
        return this._writedAtRankPermission;
    }

    set rankId(value) {
        this._rankId = value;
    }

    set permissionId(value) {
        this._permissionId = value;
    }

    set createUserId(value) {
        this._createUserId = value;
    }

    set writeUserId(value) {
        this._writeUserId = value;
    }

    set createdAtRankPermission(value) {
        this._createdAtRankPermission = moment(value).format('DD-MM-YYYY HH:mm:ss');
    }

    set writedAtRankPermission(value) {
        this._writedAtRankPermission = moment(value).format('DD-MM-YYYY HH:mm:ss');
    }

    static getAllRankPermissions(callback) {
        db.query('CALL getAllRankPermissions()', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const rankPermissions = results[0].map(row => new RankPermission(row.rankId, row.permissionId, row.createUserId, row.writeUserId, row.createdAtRankPermission, row.writedAtRankPermission));
            callback(null, rankPermissions);
        });
    }

    static getRankPermissionById(rankId, permissionId, callback) {
        db.query('CALL readRankPermission(?, ?)', [rankId, permissionId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const row = results[0][0];
            const rankPermission = new RankPermission(row.rankId, row.permissionId, row.createUserId, row.writeUserId, row.createdAtRankPermission, row.writedAtRankPermission);
            callback(null, rankPermission);
        });
    }

    save(callback) {
        if (this.rankId && this.permissionId) {
            db.query('CALL updateRankPermission(?, ?, ?)', [this.rankId, this.permissionId, this.writeUserId], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        } else {
            db.query('CALL createRankPermission(?, ?, ?, ?)', [this.rankId, this.permissionId, this.createUserId, this.writeUserId], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        }
    }

    static deleteRankPermission(rankId, permissionId, callback) {
        db.query('CALL deleteRankPermission(?, ?)', [rankId, permissionId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static searchRankPermissionsByRank(rankId, callback) {
        db.query('CALL searchRankPermissionsByRank(?)', [rankId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const rankPermissions = results[0].map(row => new RankPermission(row.rankId, row.permissionId, row.createUserId, row.writeUserId, row.createdAtRankPermission, row.writedAtRankPermission));
            callback(null, rankPermissions);
        });
    }

    static searchRankPermissionsByPermission(permissionId, callback) {
        db.query('CALL searchRankPermissionsByPermission(?)', [permissionId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const rankPermissions = results[0].map(row => new RankPermission(row.rankId, row.permissionId, row.createUserId, row.writeUserId, row.createdAtRankPermission, row.writedAtRankPermission));
            callback(null, rankPermissions);
        });
    }

    static getRankPermissionsByPage(limit, offset, callback) {
        db.query('CALL getRankPermissionsByPage(?, ?)', [limit, offset], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const rankPermissions = results[0].map(row => new RankPermission(row.rankId, row.permissionId, row.createUserId, row.writeUserId, row.createdAtRankPermission, row.writedAtRankPermission));
            callback(null, rankPermissions);
        });
    }
}

module.exports = RankPermission;