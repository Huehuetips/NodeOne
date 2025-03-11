const { body, param } = require('express-validator');
const User = require('../models/userModel');
const Rank = require('../models/rankModel');

const validateUser = [
    body('name')
        .notEmpty().withMessage('El nombre es requerido')
        .matches(/^[a-zA-Z\s]{3,50}$/).withMessage('El nombre debe tener entre 3 y 50 caracteres y solo letras')
        .custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                User.searchUserByName(value, true, (err, user) => {
                    if (err) {
                        return reject(new Error('Error al verificar el nombre de usuario'));
                    }
                    if (user) {
                        return reject(new Error('El nombre de usuario ya existe'));
                    }
                    resolve(true);
                });
            });
        }),
    body('user')
        .notEmpty().withMessage('Usuario es requerido')
        .matches(/^[a-zA-Z0-9_]{3,15}$/).withMessage('Usuario debe tener entre 3 y 15 caracteres y solo letras y números')
        .custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                User.searchUserByUser(value, true, (err, user) => {
                    if (err) {
                        return reject(new Error('Error al verificar el usuario'));
                    }
                    if (user) {
                        return reject(new Error('El usuario ya existe'));
                    }
                    resolve(true);
                });
            });
        }),
    body('email')
        .isEmail().withMessage('Email no es válido')
        .custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                User.searchUserByEmail(value, (err, user) => {
                    if (err) {
                        return reject(new Error('Error al verificar el email'));
                    }
                    if (user) {
                        return reject(new Error('El email ya existe'));
                    }
                    resolve(true);
                });
            });
        }),
    body('password')
        .notEmpty().withMessage('Password es requerido')
        .isLength({ min: 8 }).withMessage('Password debe tener al menos 8 caracteres')
        .matches(/[a-z]/).withMessage('Password debe tener al menos una letra minúscula')
        .matches(/[A-Z]/).withMessage('Password debe tener al menos una letra mayúscula')
        .matches(/[0-9]/).withMessage('Password debe tener al menos un número')
        .matches(/[@$!%*?&#]/).withMessage('Password debe tener al menos un caracter especial (@$!%*?&#)'),
    body('rankId')
        .isInt().withMessage('rankId debe ser un número entero')
        .custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                Rank.getRankById(value, (err, rank) => {
                    if (err) {
                        return reject(new Error('Error al verificar el rankId'));
                    }
                    if (!rank) {
                        return reject(new Error('El rankId no es válido'));
                    }
                    resolve(true);
                });
            });
        })
];

const validateUserId = [
    param('id').isInt().withMessage('User ID must be an integer')
];

const validateUserName = [
    param('name').notEmpty().withMessage('Name is required')
];

module.exports = {
    validateUser,
    validateUserId,
    validateUserName
};
