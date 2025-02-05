const db = require('../db/queries');


exports.getCreateMessage = (req, res) => {
    res.render('create-message', {
        title: "Create message",
        errors: [] 
    })
}

exports.postCreateMessage = async (req, res) => {
    try {
        const { title, content } = req.body;
        await db.createMessage(title, content, req.user.id);
        res.redirect('/');
    } catch (error) {
        console.log('Message creation error', error);
        res.render('create-message', {
            title: "Create message",
            errors: [{ msg: "Error creating message"}]
        })
    }
}

exports.deleteMessage = async (req, res) => {
    try {
        if (!req.user.is_admin) {
            return res.status(403).send('Unauthorized');
        }
        await db.deleteMessage(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.log('Message deletion error:', error);
        res.status(500).send('Error deleting message');
    }
}