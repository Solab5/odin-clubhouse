# Secret Club - Members Only Message Board

A secure message board application where members can write anonymous posts. Only members can see who wrote each message, while non-members can only see the message content.

## Features

- User Authentication (signup/login)
- Member-only content
- Admin privileges
- Anonymous message board
- Secure password handling
- Responsive design

## Technologies Used

- Node.js & Express
- PostgreSQL
- EJS Templates
- Passport.js Authentication
- bcrypt.js for password hashing
- Express-session for session management

## Setup

1. Clone the repository:

git clone https://github.com/solab5/secret-club.git

2. Install dependencies:

npm install

3. Create a `.env` file in the root directory with:

SESSION_SECRET=your_session_secret
CLUB_PASSCODE=your_club_passcode
DATABASE_URL=your_postgres_connection_string

4. Set up the database:
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    is_admin BOOLEAN DEFAULT false,
    is_member BOOLEAN DEFAULT false
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    content TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. Start the server:

npm start

## Usage

- Sign up for an account
- Use the secret passcode to become a member
- Create and view messages
- Members can see message authors
- Admins can delete messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC License - See [LICENSE](LICENSE) for details.

## Author

Twinomugisha Morris - [GitHub Profile](https://github.com/solab5)

