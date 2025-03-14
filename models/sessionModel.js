const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');

class Session extends Model {}

Session.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    deviceInfo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startTimeSession: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    lastConnectionTimeSession: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    keepActiveSession: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'Session',
    tableName: 'sessions',
});

User.hasMany(Session, { foreignKey: 'userId', as: 'sessions' });
Session.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Session;
