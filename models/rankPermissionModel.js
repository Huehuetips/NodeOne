const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class RankPermission extends Model {}

RankPermission.init({
    rankId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createUserId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    writeUserId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    createdAtRankPermission: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    writedAtRankPermission: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'RankPermission',
    tableName: 'rank_permissions',
    timestamps: false,
});

module.exports = RankPermission;