const { body, param } = require('express-validator');
const UserController = require('../controllers/usersController/userController');
const Rank = require('../models/rankModel');
const User = require('../models/userModel');

const validateUser = [
    body('nameUser')
        .notEmpty().withMessage('El nombre es requerido')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]{3,50}$/).withMessage('El nombre debe tener entre 3 y 50 caracteres y solo letras')
        .custom(async (value) => {
            const user = await User.findOne({ where: { nameUser: value } });
            if (user) {
                throw new Error('El nombre ya existe');
            }
        }),
    body('userUser')
        .notEmpty().withMessage('Usuario es requerido')
        .matches(/^[a-zA-Z0-9_]{3,15}$/).withMessage('Usuario debe tener entre 3 y 15 caracteres y solo letras y números')
        .custom(async (value) => {
            const user = await User.findOne({ where: { userUser: value } });
            if (user) {
                throw new Error('El usuario ya existe');
            }
        }),
    body('emailUser')
        .isEmail().withMessage('Email no es válido')
        .custom(async (value) => {
            const user = await User.findOne({ where: { emailUser: value } });
            if (user) {
                throw new Error('El correo ya existe');
            }
        }),
    body('rankId')
        .isInt().withMessage('rankId debe ser un número entero')
        .custom(async (value) => {
            const rank = await Rank.findByPk(value);
            if (!rank) {
                throw new Error('El rango no es válido');
            }
        })
];

const validatePassword = [
    body('passwordUser')
        .notEmpty().withMessage('Password es requerido')
        .isLength({ min: 8 }).withMessage('Password debe tener al menos 8 caracteres')
        .matches(/[a-z]/).withMessage('Password debe tener al menos una letra minúscula')
        .matches(/[A-Z]/).withMessage('Password debe tener al menos una letra mayúscula')
        .matches(/[0-9]/).withMessage('Password debe tener al menos un número')
        .matches(/[@$!%*?&#]/).withMessage('Password debe tener al menos un caracter especial (@$!%*?&#)')
];

// const validateUserId = [
//     param('id').isInt().withMessage('User ID must be an integer')
// ];

// const validateUserName = [
//     param('name').notEmpty().withMessage('Name is required')
// ];

module.exports = {
    validateUser,
    validatePassword,
    // validateUserId,
    // validateUserName
};
