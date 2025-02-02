const { Router } = require('express');
const authController = require('../controllers/authController');
const { validateUser } = require('../middleware/validateUser');
const authRouter = Router();

authRouter.get('/signup', authController.getSignup);
authRouter.post('/signup', validateUser, authController.postSignup);

module.exports = authRouter;