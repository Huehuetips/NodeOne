const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Module = require('./moduleModel');
const User = require('./userModel');

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
        references: {
            model: Module,
            key: 'id',
        },
    },
    namePermission: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createUserId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            model: User,
            key: 'id',
        },
    },
    writeUserId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions',
});
Module.hasMany(Permission, { foreignKey: 'moduleId' });
Permission.belongsTo(Module, { foreignKey: 'moduleId' });

User.hasMany(Permission, { foreignKey: 'createUserId', as: 'createdPermissions' });
User.hasMany(Permission, { foreignKey: 'writeUserId', as: 'writtenPermissions' });
Permission.belongsTo(User, { foreignKey: 'createUserId', as: 'createUser' });
Permission.belongsTo(User, { foreignKey: 'writeUserId', as: 'writeUser' });

module.exports = Permission;