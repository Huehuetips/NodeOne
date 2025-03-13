const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const dropAllTables = [
    `SET FOREIGN_KEY_CHECKS = 0;`,
    // Drop tables
    `DROP TABLE IF EXISTS users;`,
    `DROP TABLE IF EXISTS rank_permissions;`,
    `DROP TABLE IF EXISTS ranks;`,
    `DROP TABLE IF EXISTS permissions;`,
    `DROP TABLE IF EXISTS modules;`,
    // Drop stored procedures
    // Users
    `DROP PROCEDURE IF EXISTS createUser;`,
    `DROP PROCEDURE IF EXISTS readUser;`,
    `DROP PROCEDURE IF EXISTS updateUser;`,
    `DROP PROCEDURE IF EXISTS deleteUser;`,
    `DROP PROCEDURE IF EXISTS searchUserByName;`,
    `DROP PROCEDURE IF EXISTS searchUserByUsername;`,
    `DROP PROCEDURE IF EXISTS getUserByUsername;`,
    `DROP PROCEDURE IF EXISTS searchUserByEmail;`,
    `DROP PROCEDURE IF EXISTS getAllUsers;`,
    `DROP PROCEDURE IF EXISTS getUsersByPage;`,
    `DROP PROCEDURE IF EXISTS disableUser;`,
    // Ranks
    `DROP PROCEDURE IF EXISTS createRank;`,
    `DROP PROCEDURE IF EXISTS readRank;`,
    `DROP PROCEDURE IF EXISTS updateRank;`,
    `DROP PROCEDURE IF EXISTS deleteRank;`,
    `DROP PROCEDURE IF EXISTS searchRankByName;`,
    `DROP PROCEDURE IF EXISTS getAllRanks;`,
    `DROP PROCEDURE IF EXISTS getRanksByPage;`,
    // Permissions
    `DROP PROCEDURE IF EXISTS createPermission;`,
    `DROP PROCEDURE IF EXISTS readPermission;`,
    `DROP PROCEDURE IF EXISTS updatePermission;`,
    `DROP PROCEDURE IF EXISTS deletePermission;`,
    `DROP PROCEDURE IF EXISTS searchPermissionByName;`,
    `DROP PROCEDURE IF EXISTS getAllPermissions;`,
    `DROP PROCEDURE IF EXISTS getPermissionsByPage;`,
    // Rank_Permissions
    `DROP PROCEDURE IF EXISTS createRankPermission;`,
    `DROP PROCEDURE IF EXISTS readRankPermission;`,
    `DROP PROCEDURE IF EXISTS updateRankPermission;`,
    `DROP PROCEDURE IF EXISTS deleteRankPermission;`,
    `DROP PROCEDURE IF EXISTS getAllRankPermissions;`,
    `DROP PROCEDURE IF EXISTS getRankPermissionsByPage;`,
    `DROP PROCEDURE IF EXISTS searchRankPermissionsByRank;`,
    `DROP PROCEDURE IF EXISTS searchRankPermissionsByPermission;`,
    //Modules
    `DROP PROCEDURE IF EXISTS createModule;`,
    `DROP PROCEDURE IF EXISTS readModule;`,
    `DROP PROCEDURE IF EXISTS updateModule;`,
    `DROP PROCEDURE IF EXISTS deleteModule;`,
    `DROP PROCEDURE IF EXISTS searchModuleByName;`,
    `DROP PROCEDURE IF EXISTS getAllModules;`,
    `DROP PROCEDURE IF EXISTS getModulesByPage;`,
    `SET FOREIGN_KEY_CHECKS = 1;`
];

const Users = [
    `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rankId INT,
        nameUser VARCHAR(100) NOT NULL UNIQUE,
        userUser VARCHAR(15) NOT NULL UNIQUE,
        emailUser VARCHAR(75) NOT NULL UNIQUE,
        passwordUser TEXT NOT NULL,
        enableUser BIT NOT NULL DEFAULT 1,
        createUserId INT NOT NULL DEFAULT 1,
        writeUserId INT NOT NULL DEFAULT 1,
        createdAtUser TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        writedAtUser TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (createUserId) REFERENCES users(id),
        FOREIGN KEY (writeUserId) REFERENCES users(id)
    )`,
    `CREATE PROCEDURE createUser(
        IN p_nameUser VARCHAR(100),
        IN p_userUser VARCHAR(15),
        IN p_emailUser VARCHAR(75),
        IN p_passwordUser TEXT,
        IN p_rankId INT,
        IN p_createUserId INT,
        IN p_writeUserId INT
    )
    BEGIN
        INSERT INTO users (nameUser, userUser, emailUser, passwordUser, rankId, createUserId, writeUserId) VALUES (p_nameUser, p_userUser, p_emailUser, p_passwordUser, p_rankId, p_createUserId, p_writeUserId);
    END`,
    `CREATE PROCEDURE readUser(IN p_id INT)
    BEGIN
        SELECT * FROM users WHERE id = p_id;
    END`,
    `CREATE PROCEDURE updateUser(
        IN p_id INT,
        IN p_nameUser VARCHAR(100),
        IN p_userUser VARCHAR(15),
        IN p_emailUser VARCHAR(75),
        IN p_rankId INT,
        IN p_writeUserId INT
    )
    BEGIN
        UPDATE users SET nameUser = p_nameUser, userUser = p_userUser, emailUser = p_emailUser, rankId = p_rankId, writeUserId = p_writeUserId WHERE id = p_id;
    END`,
    `CREATE PROCEDURE deleteUser(IN p_id INT)
    BEGIN
        DELETE FROM users WHERE id = p_id;
    END`,
    `CREATE PROCEDURE searchUserByName(IN p_nameUser VARCHAR(100))
    BEGIN
        SELECT * FROM users WHERE nameUser LIKE CONCAT('%', p_nameUser, '%');
    END`,
    `CREATE PROCEDURE searchUserByUsername(IN p_userUser VARCHAR(15))
    BEGIN
        SELECT * FROM users WHERE userUser LIKE CONCAT('%', p_userUser, '%');
    END`,
    `CREATE PROCEDURE getUserByUsername(IN p_userUser VARCHAR(15))
    BEGIN
        SELECT * FROM users WHERE userUser = p_userUser;
    END`,
    `CREATE PROCEDURE searchUserByEmail(IN p_email VARCHAR(75))
    BEGIN
        SELECT * FROM users WHERE emailUser LIKE CONCAT('%', p_email, '%');
    END`,
    `CREATE PROCEDURE getAllUsers()
    BEGIN
        SELECT * FROM users;
    END`,
    `CREATE PROCEDURE getUsersByPage(IN p_limit INT, IN p_offset INT)
    BEGIN
        SELECT * FROM users LIMIT p_limit OFFSET p_offset;
    END`,
    `CREATE PROCEDURE disableUser(IN p_id INT)
    BEGIN
        UPDATE users SET enableUser = 0 WHERE id = p_id;
    END`,
];

const Modules = [
    `CREATE TABLE IF NOT EXISTS modules (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nameModule VARCHAR(100) NOT NULL UNIQUE,
        descriptionModule TEXT,
        createdAtModules TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        writedAtModules TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    `CREATE PROCEDURE createModule(IN p_nameModule VARCHAR(100), IN p_descriptionModule TEXT)
    BEGIN
        INSERT INTO modules (nameModule, descriptionModule) VALUES (p_nameModule, p_descriptionModule);
    END`,
    `CREATE PROCEDURE readModule(IN p_id INT)
    BEGIN
        SELECT * FROM modules WHERE id = p_id;
    END`,
    `CREATE PROCEDURE updateModule(IN p_id INT, IN p_nameModule VARCHAR(100), IN p_descriptionModule TEXT)
    BEGIN
        UPDATE modules SET nameModule = p_nameModule, descriptionModule = p_descriptionModule WHERE id = p_id;
    END`,
    `CREATE PROCEDURE deleteModule(IN p_id INT)
    BEGIN
        DELETE FROM modules WHERE id = p_id;
    END`,
    `CREATE PROCEDURE searchModuleByName(IN p_nameModule VARCHAR(100))
    BEGIN
        SELECT * FROM modules WHERE nameModule LIKE CONCAT('%', p_nameModule, '%');
    END`,
    `CREATE PROCEDURE getAllModules()
    BEGIN
        SELECT * FROM modules;
    END`,
    `CREATE PROCEDURE getModulesByPage(IN p_limit INT, IN p_offset INT)
    BEGIN
        SELECT * FROM modules LIMIT p_limit OFFSET p_offset;
    END`,
];

const Permissions = [
    `CREATE TABLE IF NOT EXISTS permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        moduleId INT NOT NULL,
        namePermission VARCHAR(50) NOT NULL,
        createUserId INT NOT NULL DEFAULT 1,
        writeUserId INT NOT NULL DEFAULT 1,
        createdAtPermission TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        writedAtPermission TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (moduleId) REFERENCES modules(id),
        FOREIGN KEY (createUserId) REFERENCES users(id),
        FOREIGN KEY (writeUserId) REFERENCES users(id)
    )`,
    `CREATE PROCEDURE createPermission(IN p_namePermission VARCHAR(50), IN p_moduleId INT, IN p_createUserId INT, IN p_writeUserId INT)
    BEGIN
        INSERT INTO permissions (namePermission, moduleId, createUserId, writeUserId) VALUES (p_namePermission, p_moduleId, p_createUserId, p_writeUserId);
    END`,
    `CREATE PROCEDURE readPermission(IN p_id INT)
    BEGIN
        SELECT * FROM permissions WHERE id = p_id;
    END`,
    `CREATE PROCEDURE updatePermission(IN p_id INT, IN p_namePermission VARCHAR(50), IN p_moduleId INT, IN p_writeUserId INT)
    BEGIN
        UPDATE permissions SET namePermission = p_namePermission, moduleId = p_moduleId, writeUserId = p_writeUserId WHERE id = p_id;
    END`,
    `CREATE PROCEDURE deletePermission(IN p_id INT)
    BEGIN
        DELETE FROM permissions WHERE id = p_id;
    END`,
    `CREATE PROCEDURE searchPermissionByName(IN p_namePermission VARCHAR(50))
    BEGIN
        SELECT * FROM permissions WHERE namePermission LIKE CONCAT('%', p_namePermission, '%');
    END`,
    `CREATE PROCEDURE getAllPermissions()
    BEGIN
        SELECT * FROM permissions;
    END`,
    `CREATE PROCEDURE getPermissionsByPage(IN p_limit INT, IN p_offset INT)
    BEGIN
        SELECT * FROM permissions LIMIT p_limit OFFSET p_offset;
    END`,
];

const Ranks = [
    `CREATE TABLE IF NOT EXISTS ranks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nameRank VARCHAR(50) NOT NULL UNIQUE,
        createUserId INT NOT NULL DEFAULT 1,
        writeUserId INT NOT NULL DEFAULT 1,
        createdAtRanks TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        writedAtRanks TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (createUserId) REFERENCES users(id),
        FOREIGN KEY (writeUserId) REFERENCES users(id)
    )`,
    `CREATE PROCEDURE createRank(IN p_nameRank VARCHAR(50), IN p_createUserId INT, IN p_writeUserId INT)
    BEGIN
        INSERT INTO ranks (nameRank, createUserId, writeUserId) VALUES (p_nameRank, p_createUserId, p_writeUserId);
    END`,
    `CREATE PROCEDURE readRank(IN p_id INT)
    BEGIN
        SELECT * FROM ranks WHERE id = p_id;
    END`,
    `CREATE PROCEDURE updateRank(IN p_id INT, IN p_nameRank VARCHAR(50), IN p_writeUserId INT)
    BEGIN
        UPDATE ranks SET nameRank = p_nameRank, writeUserId = p_writeUserId WHERE id = p_id;
    END`,
    `CREATE PROCEDURE deleteRank(IN p_id INT)
    BEGIN
        DELETE FROM ranks WHERE id = p_id;
    END`,
    `CREATE PROCEDURE searchRankByName(IN p_nameRank VARCHAR(100))
    BEGIN
        SELECT * FROM ranks WHERE nameRank LIKE CONCAT('%', p_nameRank, '%');
    END`,
    `CREATE PROCEDURE getAllRanks()
    BEGIN
        SELECT * FROM ranks;
    END`,
    `CREATE PROCEDURE getRanksByPage(IN p_limit INT, IN p_offset INT)
    BEGIN
        SELECT * FROM ranks LIMIT p_limit OFFSET p_offset;
    END`,
];

const RankPermissions = [
    `CREATE TABLE IF NOT EXISTS rank_permissions (
        rankId INT,
        permissionId INT,
        createUserId INT NOT NULL DEFAULT 1,
        writeUserId INT NOT NULL DEFAULT 1,
        createdAtRankPermissions TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        writedAtRankPermissions TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (rankId, permissionId),
        FOREIGN KEY (rankId) REFERENCES ranks(id),
        FOREIGN KEY (permissionId) REFERENCES permissions(id),
        FOREIGN KEY (createUserId) REFERENCES users(id),
        FOREIGN KEY (writeUserId) REFERENCES users(id)
    )`,
    `CREATE PROCEDURE createRankPermission(IN p_rankId INT, IN p_permissionId INT, IN p_createUserId INT, IN p_writeUserId INT)
    BEGIN
        INSERT INTO rank_permissions (rankId, permissionId, createUserId, writeUserId) VALUES (p_rankId, p_permissionId, p_createUserId, p_writeUserId);
    END`,
    `CREATE PROCEDURE readRankPermission(IN p_rankId INT, IN p_permissionId INT)
    BEGIN
        SELECT * FROM rank_permissions WHERE rankId = p_rankId AND permissionId = p_permissionId;
    END`,
    `CREATE PROCEDURE updateRankPermission(IN p_rankId INT, IN p_permissionId INT, IN p_writeUserId INT)
    BEGIN
        UPDATE rank_permissions SET rankId = p_rankId, permissionId = p_permissionId, writeUserId = p_writeUserId WHERE rankId = p_rankId AND permissionId = p_permissionId;
    END`,
    `CREATE PROCEDURE deleteRankPermission(IN p_rankId INT, IN p_permissionId INT)
    BEGIN
        DELETE FROM rank_permissions WHERE rankId = p_rankId AND permissionId = p_permissionId;
    END`,
    `CREATE PROCEDURE getAllRankPermissions()
    BEGIN
        SELECT * FROM rank_permissions;
    END`,
    `CREATE PROCEDURE getRankPermissionsByPage(IN p_limit INT, IN p_offset INT)
    BEGIN
        SELECT * FROM rank_permissions LIMIT p_limit OFFSET p_offset;
    END`,
    `CREATE PROCEDURE searchRankPermissionsByRank(IN p_rankId INT)
    BEGIN
        SELECT * FROM rank_permissions WHERE rankId = p_rankId;
    END`,
    `CREATE PROCEDURE searchRankPermissionsByPermission(IN p_permissionId INT)
    BEGIN
        SELECT * FROM rank_permissions WHERE permissionId = p_permissionId;
    END`,
];

const seedData = [
    `CALL createUser('_system_', 'Sistema', 'system@example.com', '@Programacion256', 1, 1, 1)`, // id = 1 usuario del sistema
    `CALL createRank('Super Admin', 1, 1)`, // id = 1
    `ALTER TABLE users ADD CONSTRAINT FK_rankId FOREIGN KEY (rankId) REFERENCES ranks(id)`,    

    // MÓDULOS
    `CALL createModule('General', 'Incluye Todos los módulos')`, // id = 1

    // PERMISOS GENERAL
    `CALL createPermission('CREATE', 1, 1, 1)`, // id = 1
    `CALL createPermission('READ', 1, 1, 1)`, // id = 2
    `CALL createPermission('WRITE', 1, 1, 1)`, // id = 3
    `CALL createPermission('DELETE', 1, 1, 1)`, // id = 4

    // Super Admin Permisos
    `CALL createRankPermission(1, 1, 1, 1)`, // Super Admin CREATE GENERAL
    `CALL createRankPermission(1, 2, 1, 1)`, // Super Admin READ GENERAL
    `CALL createRankPermission(1, 3, 1, 1)`, // Super Admin WRITE GENERAL
    `CALL createRankPermission(1, 4, 1, 1)`, // Super Admin DELETE GENERAL
    
    `CALL createUser('Administrador', 'Administrador', 'admin@example.com', '@Programacion256', 1, 1, 1)`,
    `CALL createUser('Test', 'Test', 'test@example.com', '@Programacion256', 1, 1, 1)`,
];


connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database.');

    dropAllTables.forEach((query, index) => {
        connection.query(query, (err, results) => {
            if (err) throw err;
            if (index === dropAllTables.length - 1) {
                console.log('All tables dropped.');

                const allQueries = [
                    ...Users,
                    ...Modules,
                    ...Permissions,
                    ...Ranks,
                    ...RankPermissions,
                    ...seedData,
                ];

                allQueries.forEach((query, index) => {
                    connection.query(query, (err, results) => {
                        if (err) throw err;
                        if (index === allQueries.length - 1) {
                            console.log('Tables, stored procedures, and seed data created.');
                            connection.end();
                        }
                    });
                });
            }
        });
    });
});
