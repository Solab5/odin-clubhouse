const { body } = require('express-validator');

exports.validateUser = [
    body('firstName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters')
        .escape(),

    body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .escape(),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail()
        .custom(async (email, { req }) => {
            const db = require('../db/queries');
            try {
                const userExists = await db.findUserByEmail(email);
                if (userExists) {
                    throw new Error('Email already exists');
                }
                return true
            } catch (error) {
                throw new Error(error.message);
            }
        }),
    
    body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be atleast 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain atleast one number'),

    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match')
            }
            return true
        })
]