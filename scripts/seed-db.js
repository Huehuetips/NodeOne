const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const insertModuleData = [
    `CALL createModule('Users', 'Módulo de Usuarios')`, // id = 2
    `CALL createModule('Ranks', 'Módulo de Rangos')`, // id = 3
    `CALL createModule('Permissions', 'Módulo de Permisos')`, // id = 4
    `CALL createModule('Modules', 'Módulo de Módulos')`, // id = 5
    `CALL createModule('Chat', 'Módulo de Chat')`, // id = 6
];

const insertRankData = [
    `CALL createRank('Users Admin', 1, 1)`, // id = 2
    `CALL createRank('Moderator', 1, 1)`, // id = 3
    `CALL createRank('Editor', 1, 1)`, // id = 4
    `CALL createRank('Viewer', 1, 1)`, // id = 5
    `CALL createRank('Guest', 1, 1)`, // id = 6
    `CALL createRank('Super User', 1, 1)`, // id = 6
];

const insertPermissionData = [
    // PERMISOS USERS
    `CALL createPermission('CREATE', 2, 1, 1)`, // id = 5
    `CALL createPermission('READ', 2, 1, 1)`, // id = 6
    `CALL createPermission('WRITE', 2, 1, 1)`, // id = 7
    `CALL createPermission('DELETE', 2, 1, 1)`, // id = 8
    // PERMISOS RANKS
    `CALL createPermission('CREATE', 3, 1, 1)`, // id = 9
    `CALL createPermission('READ', 3, 1, 1)`, // id = 10
    `CALL createPermission('WRITE', 3, 1, 1)`, // id = 11
    `CALL createPermission('DELETE', 3, 1, 1)`, // id = 12
    // PERMISOS PERMISSIONS
    `CALL createPermission('CREATE', 4, 1, 1)`, // id = 13
    `CALL createPermission('READ', 4, 1, 1)`, // id = 14
    `CALL createPermission('WRITE', 4, 1, 1)`, // id = 15
    `CALL createPermission('DELETE', 4, 1, 1)`, // id = 16
    // PERMISOS CHAT
    `CALL createPermission('CREATE', 6, 1, 1)`, // id = 17
    `CALL createPermission('READ', 6, 1, 1)`, // id = 18
    `CALL createPermission('WRITE', 6, 1, 1)`, // id = 19
    `CALL createPermission('DELETE', 6, 1, 1)`, // id = 20
    
];

const insertRankPermissionData = [
    // RANKS
    // Users Admin Permisos
    `CALL createRankPermission(2, 5, 1, 1)`, // Users Admin CREATE Users 
    `CALL createRankPermission(2, 6, 1, 1)`, // Users Admin READ Users
    `CALL createRankPermission(2, 7, 1, 1)`, // Users Admin WRITE Users
    `CALL createRankPermission(2, 8, 1, 1)`, // Users Admin DELETE Users
    // Moderator
    `CALL createRankPermission(3, 9, 1, 1)`, // Moderator CREATE Ranks
    `CALL createRankPermission(3, 10, 1, 1)`, // Moderator READ  Ranks
    `CALL createRankPermission(3, 11, 1, 1)`, // Moderator WRITE Ranks
    `CALL createRankPermission(3, 12, 1, 1)`, // Moderator DELETE Ranks
    // Editor
    `CALL createRankPermission(4, 13, 1, 1)`, // Editor CREATE Permissions
    `CALL createRankPermission(4, 14, 1, 1)`, // Editor READ Permissions
    `CALL createRankPermission(4, 15, 1, 1)`, // Editor WRITE Permissions
    `CALL createRankPermission(4, 16, 1, 1)`, // Editor DELETE Permissions

    `CALL createRankPermission(6, 2, 1, 1)`,
    `CALL createRankPermission(6, 6, 1, 1)`,
    `CALL createRankPermission(6, 10, 1, 1)`,
    `CALL createRankPermission(6, 14, 1, 1)`,
    `CALL createRankPermission(6, 17, 1, 1)`,
    `CALL createRankPermission(6, 18, 1, 1)`,
    `CALL createRankPermission(6, 19, 1, 1)`,
    `CALL createRankPermission(6, 20, 1, 1)`,
];

const insertUserData = [
    `CALL createUser('John Doe', 'john_doe', 'john@example.com', 'password123', 2, 1, 1)`,
    `CALL createUser('Jane Smith', 'jane_smith', 'jane@example.com', 'password123', 2, 1, 1)`,
    `CALL createUser('Alice Johnson', 'alice_johnson', 'alice@example.com', 'password123', 2, 1, 1)`,
    `CALL createUser('Bob Brown', 'bob_brown', 'bob@example.com', 'password123', 5, 1, 1)`,
    `CALL createUser('Charlie Davis', 'charlie_davis', 'charlie@example.com', 'password123', 3, 1, 1)`,
    `CALL createUser('Diana Evans', 'diana_evans', 'diana@example.com', 'password123', 6, 1, 1)`,
    `CALL createUser('Eve Foster', 'eve_foster', 'eve@example.com', 'password123', 2, 1, 1)`,
    `CALL createUser('Frank Green', 'frank_green', 'frank@example.com', 'password123', 2, 1, 1)`,
    `CALL createUser('Grace Harris', 'grace_harris', 'grace@example.com', 'password123', 2, 2, 2)`,
    `CALL createUser('Hank Irving', 'hank_irving', 'hank@example.com', 'password123', 5, 2, 2)`,
    `CALL createUser('Otro Nombre', 'otro_nombre', 'nombre@example.com', 'password123', 2, 2, 2)`,
];





connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database.');

    const allQueries = [
        ...insertModuleData,
        ...insertRankData,
        ...insertPermissionData,
        ...insertRankPermissionData,
        ...insertUserData,
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
});
