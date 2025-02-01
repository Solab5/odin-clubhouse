const db = require('../db/queries')
const bcrypt = require('bcryptjs');

exports.getSignup = (req, res) => {
    res.render('signup', { title: "sign up"});
}

exports.postSignup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).render('signup', {
                title: "sign up",
                error: "Passwords donot match"
                
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.createUser(firstName, lastName, email, hashedPassword);
        res.redirect('/login');
    } catch (error) {
        console.log('Signup error:', error);
        res.render('signup', {
            title: "sign up",
            error: "Error creating account"
        });
    }
};