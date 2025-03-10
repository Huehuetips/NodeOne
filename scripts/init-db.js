const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const dropAllTables = [
    `SET FOREIGN_KEY_CHECKS = 0;`,
    `DROP TABLE IF EXISTS users;`,
    `SET FOREIGN_KEY_CHECKS = 1;`
];

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nameUser VARCHAR(100) NOT NULL,
        userUser VARCHAR(15) NOT NULL,
        emailUser VARCHAR(75) NOT NULL UNIQUE,
        passwordUser TEXT NOT NULL,
        enable BIT NOT NULL DEFAULT 1,
        created_atUser TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        writed_atUser TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

const createUserProcedures = [
    `DROP PROCEDURE IF EXISTS createUser;`,
    `DROP PROCEDURE IF EXISTS readUser;`,
    `DROP PROCEDURE IF EXISTS updateUser;`,
    `DROP PROCEDURE IF EXISTS deleteUser;`,
    `DROP PROCEDURE IF EXISTS searchUserByName;`,
    `DROP PROCEDURE IF EXISTS getAllUsers;`,
    `DROP PROCEDURE IF EXISTS getUsersByPage;`,
    `DROP PROCEDURE IF EXISTS disableUser;`,

    `CREATE PROCEDURE createUser(
        IN p_nameUser VARCHAR(100),
        IN p_userUser VARCHAR(15),
        IN p_emailUser VARCHAR(75),
        IN p_passwordUser TEXT
    )
    BEGIN
        INSERT INTO users (nameUser, userUser, emailUser, passwordUser) VALUES (p_nameUser, p_userUser, p_emailUser, p_passwordUser);
    END;`,

    `CREATE PROCEDURE readUser(IN p_id INT)
    BEGIN
        SELECT * FROM users WHERE id = p_id;
    END;`,

    `CREATE PROCEDURE updateUser(
        IN p_id INT,
        IN p_nameUser VARCHAR(100),
        IN p_userUser VARCHAR(15),
        IN p_emailUser VARCHAR(75)
    )
    BEGIN
        UPDATE users SET nameUser = p_nameUser, userUser = p_userUser, emailUser = p_emailUser WHERE id = p_id;
    END;`,

    `CREATE PROCEDURE deleteUser(IN p_id INT)
    BEGIN
        DELETE FROM users WHERE id = p_id;
    END;`,

    `CREATE PROCEDURE searchUserByName(IN p_nameUser VARCHAR(100))
    BEGIN
        SELECT * FROM users WHERE nameUser LIKE CONCAT('%', p_nameUser, '%');
    END;`,

    `CREATE PROCEDURE getAllUsers()
    BEGIN
        SELECT * FROM users;
    END;`,

    `CREATE PROCEDURE getUsersByPage(IN p_limit INT, IN p_offset INT)
    BEGIN
        SELECT * FROM users LIMIT p_limit OFFSET p_offset;
    END;`,

    `CREATE PROCEDURE disableUser(IN p_id INT)
    BEGIN
        UPDATE users SET enable = 0 WHERE id = p_id;
    END;`
];

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the database.');

    dropAllTables.forEach((query, index) => {
        connection.query(query, (err, results) => {
            if (err) throw err;
            if (index === dropAllTables.length - 1) {
                console.log('All tables dropped.');

                connection.query(createUsersTable, (err, results) => {
                    if (err) throw err;
                    console.log('Users table created or already exists.');

                    createUserProcedures.forEach((procedure, index) => {
                        connection.query(procedure, (err, results) => {
                            if (err) throw err;
                            if (index === createUserProcedures.length - 1) {
                                console.log('Stored procedures created.');
                                connection.end();
                            }
                        });
                    });
                });

                
            }
        });
    });
});
