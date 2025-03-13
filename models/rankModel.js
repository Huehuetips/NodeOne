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
    }
}, {
    sequelize,
    modelName: 'Rank',
    tableName: 'ranks',
});

module.exports = Rank;