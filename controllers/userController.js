const userModel = require('../models/userModel');

exports.getAllUsers = (req, res) => {
    userModel.getAll((err, users) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(users);
    });
};

exports.createUser = (req, res) => {
    const newUser = req.body;
    userModel.create(newUser, (err, userId) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: userId });
    });
};