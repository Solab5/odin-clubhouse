const { Router } = require('express');
const authController = require('../controllers/authController');
const { validateUser } = require('../middleware/validateUser');
const authRouter = Router();
const { isAuth } = require('../middleware/auth');

authRouter.get('/', (req, res) => {
    res.render('index', {
        title: "Home",
        user: req.user
    })
})

authRouter.get('/signup', isAuth, authController.getSignup);
authRouter.post('/signup', isAuth, validateUser, authController.postSignup);

authRouter.get('/join-club', authController.getJoinClub);
authRouter.post('/join-club', authController.postJoinClub);

authRouter.get('/login', authController.getLogin);
authRouter.post('/login', authController.postLogin);
authRouter.get('/logout', authController.logout);



module.exports = authRouter;