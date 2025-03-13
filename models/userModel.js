const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rankId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nameUser: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userUser: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailUser: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passwordUser: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    enableUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
    modelName: 'User',
    tableName: 'users',
});

module.exports = User;
