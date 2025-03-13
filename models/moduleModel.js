const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Module extends Model {}

Module.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nameModule: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descriptionModule: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Module',
    tableName: 'modules',
});

module.exports = Module;