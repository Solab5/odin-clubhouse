const { Router } = require('express');
const messageController = require('../controllers/messageController');
const { isAuth } = require('../middleware/auth');
const messageRouter = Router();

messageRouter.get('/create', isAuth, messageController.getCreateMessage);
messageRouter.post('/create', isAuth, messageController.postCreateMessage);
messageRouter.post('/delete/:id', isAuth, messageController.deleteMessage);

module.exports = messageRouter;