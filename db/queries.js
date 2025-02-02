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