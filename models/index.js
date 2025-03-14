const sequelize = require('../config/database');
const Module = require('./moduleModel');
const User = require('./userModel');
const Rank = require('./rankModel');
const Permission = require('./permissionModel');
const Session = require('./sessionModel'); // Nueva línea

// Establecer relación de muchos a muchos entre rangos y permisos
Rank.belongsToMany(Permission, { through: 'rank_permissions', foreignKey: 'rankId' });
Permission.belongsToMany(Rank, { through: 'rank_permissions', foreignKey: 'permissionId' });

// Additional relationships
User.hasMany(Rank, { foreignKey: 'createUserId', as: 'createdRanks' });
User.hasMany(Rank, { foreignKey: 'writeUserId', as: 'writtenRanks' });
Rank.belongsTo(User, { foreignKey: 'createUserId', as: 'createUser' });
Rank.belongsTo(User, { foreignKey: 'writeUserId', as: 'writeUser' });

module.exports = {
    sequelize,
    Module,
    User,
    Rank,
    Permission,
    Session, // Nueva línea
};
