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
    createdAtModule: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    writedAtModule: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Module',
    tableName: 'modules',
    timestamps: false,
});

module.exports = Module;