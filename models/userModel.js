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
        defaultValue: '$pbkdf2-sha512$2500$lpJSirE2JsTYew.h1Bqj9A$sUYwX7/fZ8MyypNxxYQecK4U0So5B02Bbvd9C5nIJN.bg99KOfqmX4F2aWVfDtpbAekGb/x5dzEwxEkHQyD2/g',
        allowNull: false,
    },
    enableUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    defaultPasswordUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    lastPasswordChange: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,

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
