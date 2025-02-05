const db = require('../db/queries')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const passport = require('passport');
require('dotenv').config();

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
    const { firstName, lastName, email, password, isAdmin } = req.body;

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
        await db.createUser(firstName, lastName, email, hashedPassword, isAdmin === 'on');
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

const CLUB_PASSCODE = process.env.CLUB_PASSCODE;

exports.getJoinClub = (req, res) => {
    res.render('join-club', {
        title: "Join secret club",
        error: null
    })
}

exports.postJoinClub = async (req, res) => {
    const { passcode } = req.body;

    try {
        if (passcode !== CLUB_PASSCODE) {
            return res.render('join-club', {
                title: "Join secret club",
                error: "Incorrect passcode. Please try again!"
            });
        }

        await db.updateMembershipStatus(req.user.id);
        res.redirect('/');
    } catch (error) {
        console.log('Join club error:', error);
        res.render('join-club', {
            title: "Join secret club",
            error: "An error occured. Please try again."
        })
    }
}

exports.getLogin = (req, res) => {
    res.render('login', {
        title: "log in",
        error: req.flash('error')
    });
}

exports.postLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/')
    });
}

exports.getHome = async (req, res) => {
    try {
        const messages = await db.getAllMessages();
        res.render('index', {
            title: "Home",
            user: req.user,
            messages: messages
        });
    } catch (error) {
        console.log('Error fetching messages:', error);
        res.render('index', {
            title: "Home",
            user: req.user,
            messages: []
        });
    }
};