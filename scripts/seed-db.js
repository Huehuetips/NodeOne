const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const insertUserData = [
    `CALL createUser('John Doe', 'john_doe', 'john@example.com', 'password123');`,
    `CALL createUser('Jane Smith', 'jane_smith', 'jane@example.com', 'password456');`,
    `CALL createUser('Alice Johnson', 'alice_johnson', 'alice@example.com', 'password789');`,
    `CALL createUser('Bob Brown', 'bob_brown', 'bob@example.com', 'password101');`,
    `CALL createUser('Charlie Davis', 'charlie_davis', 'charlie@example.com', 'password102');`,
    `CALL createUser('Diana Evans', 'diana_evans', 'diana@example.com', 'password103');`,
    `CALL createUser('Eve Foster', 'eve_foster', 'eve@example.com', 'password104');`,
    `CALL createUser('Frank Green', 'frank_green', 'frank@example.com', 'password105');`,
    `CALL createUser('Grace Harris', 'grace_harris', 'grace@example.com', 'password106');`,
    `CALL createUser('Hank Irving', 'hank_irving', 'hank@example.com', 'password107');`
];

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database.');

    insertUserData.forEach((query, index) => {
        connection.query(query, (err, results) => {
        if (err) throw err;
            if (index === insertUserData.length - 1) {
                console.log('Test data inserted into users table using stored procedures.');
                connection.end();
            }
        });
    });
});
