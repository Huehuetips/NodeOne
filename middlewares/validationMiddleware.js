const { body, param } = require('express-validator');

const validateUser = [
    body('name').notEmpty().withMessage('Name is required'),
    body('user').notEmpty().withMessage('User is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
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
