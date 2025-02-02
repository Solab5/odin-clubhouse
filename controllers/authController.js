const db = require('../db/queries')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.getSignup = (req, res) => {
    res.render('signup', { 
        title: "sign up",
        errors: [],
        oldInput: {
            firstName: '',
            lastName: '',
            email: ''
        }
    });
}

exports.postSignup = async (req, res) => {
    const errors = validationResult(req);
    const { firstName, lastName, email, password } = req.body;

    if(!errors.isEmpty()) {
        return res.status(400).render('signup', {
            title: "sign up",
            errors: errors.array(),
            oldInput: {
                firstName,
                lastName,
                email
            }
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.createUser(firstName, lastName, email, hashedPassword);
        res.redirect('/login');
    } catch (error) {
        console.log('Signup error:', error);
        res.render('signup', {
            title: "sign up",
            errors: [{ msg: "Error creating an account"}],
            oldInput: {
                firstName,
                lastName,
                email
            }
        });
    }

};