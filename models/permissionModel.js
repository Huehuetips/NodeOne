const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Permission extends Model {}

Permission.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    moduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    namePermission: {
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
}, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions',
});

module.exports = Permission;