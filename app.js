const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise'); 
const path = require('path');
require('dotenv').config();

const app = express();
const port = 9015;

app.use(session({
    secret: 'my_new_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// db and tables
async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        await connection.query('CREATE DATABASE IF NOT EXISTS uid');
        await connection.query('USE uid');
        const [rows, fields] = await connection.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)');
        connection.release();
        console.log('Database and table initialization successful');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

initializeDatabase();

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const connection = await pool.getConnection();
        await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        connection.release();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Endpoint for user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        connection.release();
        console.log(`********************************`);
        console.log(results);
        if (results.length === 0 || !bcrypt.compareSync(password, results[0].password)) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }

        req.session.userId = results[0].id;
        req.session.username = results[0].username;

        res.redirect('/index');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login page.html'));
});

app.get('/index', (req, res) => {
    if (req.session.userId && req.session.username) {
        res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
    } else {
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
