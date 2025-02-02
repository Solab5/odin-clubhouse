const { Router } = require('express');
const authController = require('../controllers/authController');
const { validateUser } = require('../middleware/validateUser');
const authRouter = Router();

authRouter.get('/signup', authController.getSignup);
authRouter.post('/signup', validateUser, authController.postSignup);

authRouter.get('/join-club', authController.getJoinClub);
authRouter.post('/join-club', authController.getPostClub);


module.exports = authRouter;