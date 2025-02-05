const { use } = require('passport');
const pool = require('./pool');

exports.createUser = async (firstName, lastName, email, password, isAdmin) => {
    try {
        await pool.query(
        "INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5)",
        [firstName, lastName, email, password, isAdmin]
        );
    } catch(error) {
        console.log("failed to add user to data base with Error:", error)
        throw error;
    }
    
}

exports.findUserByEmail = async (email) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        return result.rows[0];
    } catch(error) {
        console.log("Error checking email:", error);
        throw error;
    }
}

exports.updateMembershipStatus = async (userId) => {
    try {
        await pool.query(
            "UPDATE users SET is_member = true WHERE id = $1",
            [userId]
        );
    } catch (error) {
        console.log("Error updating membership status:", error);
        throw error;
    }
}

exports.findUserById = async (id) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );
        return result.rows[0];
    } catch(error) {
        console.log("Error finding user:", error);
        throw error;
    }
}

exports.createMessage = async (title, content, authorId) => {
    try {
        await pool.query(
            "INSERT INTO messages (title, content, author_id) VALUES ($1, $2, $3)",
            [title, content, authorId]
        );   
    } catch (error) {
        console.log("Error creating message:", error);
        throw error;
    }
}

exports.getAllMessages = async () => {
    try {
        const result = await pool.query(
            `SELECT messages.*, users.first_name, users.last_name, 
            TO_CHAR(messages.created_at, 'Mon DD, YYYY') as formatted_date
            FROM messages
            JOIN users ON messages.author_id = users.id
            ORDER BY messages.created_at DESC`
        );
        return result.rows;
    } catch (error) {
        console.log("Error fetching messages:", error);
        throw error;
    }
}

exports.deleteMessage = async (messageId) => {
    try {
        await pool.query(
            "DELETE FROM messages WHERE id = $1",
            [messageId]
        );
    } catch (error) {
        console.log("Error deleting message:", error);
        throw error;
    }
}