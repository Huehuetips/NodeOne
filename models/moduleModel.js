const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

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
    createUserId: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    writeUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Module',
    tableName: 'modules',
});

User.hasMany(Module, { foreignKey: 'createUserId', as: 'createdModules' });
User.hasMany(Module, { foreignKey: 'writeUserId', as: 'writtenModules' });
Module.belongsTo(User, { foreignKey: 'createUserId', as: 'createUser' });
Module.belongsTo(User, { foreignKey: 'writeUserId', as: 'writeUser' });

module.exports = Module;