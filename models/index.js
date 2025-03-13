const sequelize = require('../config/database');
const Module = require('./moduleModel');
const User = require('./userModel');
const Rank = require('./rankModel');
const Permission = require('./permissionModel');

// Define relationships
Rank.hasMany(User, { foreignKey: 'rankId' });
User.belongsTo(Rank, { foreignKey: 'rankId' });

Module.hasMany(Permission, { foreignKey: 'moduleId' });
Permission.belongsTo(Module, { foreignKey: 'moduleId' });

// Establecer relación de muchos a muchos directamente
Rank.belongsToMany(Permission, { through: 'rank_permissions', foreignKey: 'rankId' });
Permission.belongsToMany(Rank, { through: 'rank_permissions', foreignKey: 'permissionId' });

// Additional relationships
User.hasMany(Rank, { foreignKey: 'createUserId', as: 'createdRanks' });
User.hasMany(Rank, { foreignKey: 'writeUserId', as: 'writtenRanks' });
Rank.belongsTo(User, { foreignKey: 'createUserId', as: 'createUser' });
Rank.belongsTo(User, { foreignKey: 'writeUserId', as: 'writeUser' });

User.hasMany(Permission, { foreignKey: 'createUserId', as: 'createdPermissions' });
User.hasMany(Permission, { foreignKey: 'writeUserId', as: 'writtenPermissions' });
Permission.belongsTo(User, { foreignKey: 'createUserId', as: 'createUser' });
Permission.belongsTo(User, { foreignKey: 'writeUserId', as: 'writeUser' });

// Relaciones adicionales para la tabla de usuarios
User.hasMany(User, { foreignKey: 'createUserId', as: 'createdUsers' });
User.hasMany(User, { foreignKey: 'writeUserId', as: 'writtenUsers' });
User.belongsTo(User, { foreignKey: 'createUserId', as: 'createUser' });
User.belongsTo(User, { foreignKey: 'writeUserId', as: 'writeUser' });

module.exports = {
    sequelize,
    Module,
    User,
    Rank,
    Permission,
};
