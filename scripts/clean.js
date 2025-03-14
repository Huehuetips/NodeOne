const mysql = require('mysql2');
require('dotenv').config();
const { exec } = require('child_process');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const dropAllTables = [
    // Drop tables
    `SET FOREIGN_KEY_CHECKS = 0;`,
    `DROP TABLE IF EXISTS users;`,
    `DROP TABLE IF EXISTS rank_permissions;`,
    `DROP TABLE IF EXISTS ranks;`,
    `DROP TABLE IF EXISTS permissions;`,
    `DROP TABLE IF EXISTS modules;`,
    `DROP TABLE IF EXISTS sessions;`,
    `SET FOREIGN_KEY_CHECKS = 1;`
];

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database.');

    dropAllTables.forEach((query, index) => {
        connection.query(query, (err, results) => {
            if (err) throw err;
            if (index === dropAllTables.length - 1) {
                console.log('All tables dropped.');
                connection.end();
            }
        });
    });
});
