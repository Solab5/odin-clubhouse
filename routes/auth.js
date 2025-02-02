const { Router } = require('express');
const authController = require('../controllers/authController')
const authRouter = Router();

authRouter.get('/signup', authController.getSignup);
authRouter.post('/signup', authController.postSignup);

module.exports = authRouter;