const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Rank = require('./rankModel');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
        defaultValue: 1,
        allowNull: false,
        references: {
            model: User,
            key: 'id', 
        },
    },
    rankId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Rank,
            key: 'id',
        },
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
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
});

Rank.hasMany(User, { foreignKey: 'rankId' });
User.belongsTo(Rank, { foreignKey: 'rankId' });
User.hasMany(User, { foreignKey: 'createUserId', as: 'createdUsers' });
User.hasMany(User, { foreignKey: 'writeUserId', as: 'writtenUsers' });
User.belongsTo(User, { foreignKey: 'createUserId', as: 'createUser' });
User.belongsTo(User, { foreignKey: 'writeUserId', as: 'writeUser' });


module.exports = User;
