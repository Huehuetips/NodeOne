const sequelize = require('../config/database');
const Module = require('./moduleModel');
const User = require('./userModel');
const Rank = require('./rankModel');
const Permission = require('./permissionModel');
const RankPermission = require('./rankPermissionModel');

// Define relationships
Rank.hasMany(User, { foreignKey: 'rankId' });
User.belongsTo(Rank, { foreignKey: 'rankId' });

Module.hasMany(Permission, { foreignKey: 'moduleId' });
Permission.belongsTo(Module, { foreignKey: 'moduleId' });

Rank.belongsToMany(Permission, { through: RankPermission, foreignKey: 'rankId' });
Permission.belongsToMany(Rank, { through: RankPermission, foreignKey: 'permissionId' });

// Additional relationships
User.hasMany(Rank, { foreignKey: 'createUserId', as: 'createdRanks' });
User.hasMany(Rank, { foreignKey: 'writeUserId', as: 'writtenRanks' });
Rank.belongsTo(User, { foreignKey: 'createUserId', as: 'creator' });
Rank.belongsTo(User, { foreignKey: 'writeUserId', as: 'writer' });

User.hasMany(Permission, { foreignKey: 'createUserId', as: 'createdPermissions' });
User.hasMany(Permission, { foreignKey: 'writeUserId', as: 'writtenPermissions' });
Permission.belongsTo(User, { foreignKey: 'createUserId', as: 'creator' });
Permission.belongsTo(User, { foreignKey: 'writeUserId', as: 'writer' });

User.hasMany(RankPermission, { foreignKey: 'createUserId', as: 'createdRankPermissions' });
User.hasMany(RankPermission, { foreignKey: 'writeUserId', as: 'writtenRankPermissions' });
RankPermission.belongsTo(User, { foreignKey: 'createUserId', as: 'creator' });
RankPermission.belongsTo(User, { foreignKey: 'writeUserId', as: 'writer' });

sequelize.sync();

module.exports = {
    Module,
    User,
    Rank,
    Permission,
    RankPermission,
};
