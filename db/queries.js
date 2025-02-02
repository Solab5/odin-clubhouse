const { use } = require('passport');
const pool = require('./pool');

exports.createUser = async (firstName, lastName, email, password) => {
    try {
        await pool.query(
        "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
        [firstName, lastName, email, password]
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