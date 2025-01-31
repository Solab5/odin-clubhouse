const { Router } = require('express');
const authController = require('../contollers/authController')
const authRouter = Router();

authRouter.get('/signup', authController.getSignup);
authRouter.post('/signup', authController.postSignup);

module.exports = authRouter;