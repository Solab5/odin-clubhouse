const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const app = express();
require('dotenv').config();

const db = require('./db/queries');

app.use(express.json());
app.use(express.static('public'));
app.use(flash())
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await db.findUserByEmail(email);
            if (!user) {
                return done(null, false, {message: 'Incorrect email'});
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect Password" });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.findUserById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// routes
const authRouter = require('./routes/auth');
app.use('/', authRouter);

const messageRouter = require('./routes/messages');
app.use('/messages', messageRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


