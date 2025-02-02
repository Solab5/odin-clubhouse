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