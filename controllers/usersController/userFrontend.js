const User = require('../../models/userModel');

class userFrontend {    
    static renderUsersPage(req, res) {
        User.getAllUsers((err, users) => {
            if (err) {
                return res.status(500).send('Error fetching users');
            }
    
            // Fetch the creator's name for each user
            const userPromises = users.map(user => {
                return new Promise((resolve, reject) => {
                    User.getUserById(user.createUserId, (err, creator) => {
                        if (err) {
                            return reject(err);
                        }
                        user.createUserId = creator;
                    });
                    User.getUserById(user.writeUserId, (err, creator) => {
                        if (err) {
                            return reject(err);
                        }
                        user.writeUserId = creator;
                        resolve(user);
                    });
                });
            });

            Promise.all(userPromises)
                .then(usersWithCreators => {
                    res.render('users/index', { title: 'Users', users: usersWithCreators });
                })
                .catch(err => {
                    res.status(500).send('Error fetching user creators');
                });
        });
    }

    static renderCreateUserPage(req, res) {
        res.render('users/create', { title: 'Crear Usuario' });
    }

    static renderUpdateUserPage(req, res) {
        const userId = req.params.id;
        User.getUserById(userId, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('users/update', { title: 'Actualizar Usuario', user });
        });
    }

    static renderUserDetailPage(req, res) {
        const userId = req.params.id;
        User.getUserById(userId, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('users/detail', { title: 'Detalles del Usuario', user });
        });
    }
}

module.exports = userFrontend;
