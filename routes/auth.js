const { Router } = require('express');
const authController = require('../controllers/authController');
const { validateUser } = require('../middleware/validateUser');
const authRouter = Router();
const { isAuth } = require('../middleware/auth');

authRouter.get('/', isAuth, authController.getHome)

authRouter.get('/signup',  authController.getSignup);
authRouter.post('/signup', validateUser, authController.postSignup);

authRouter.get('/join-club', authController.getJoinClub);
authRouter.post('/join-club', authController.postJoinClub);

authRouter.get('/login', authController.getLogin);
authRouter.post('/login', authController.postLogin);
authRouter.get('/logout', authController.logout);



module.exports = authRouter;