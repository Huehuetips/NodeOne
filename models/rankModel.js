const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Rank extends Model {}

Rank.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nameRank: {
        type: DataTypes.STRING,
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
    createdAtRank: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    writedAtRank: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Rank',
    tableName: 'ranks',
    timestamps: false,
});

module.exports = Rank;