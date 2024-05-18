const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise'); 
const path = require('path');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const port = 9015;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Initialize session
app.use(session({
    secret: 'my_new_secret_key',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy for username and password login
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const connection = await pool.getConnection();
            const [results] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
            connection.release();
            
            if (results.length === 0) {
                return done(null, false, { message: 'Invalid username or password' });
            }

            const user = results[0];
            const isValidPassword = bcrypt.compareSync(password, user.password);

            if (!isValidPassword) {
                return done(null, false, { message: 'Invalid username or password' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
        connection.release();
        if (results.length === 0) {
            return done(new Error('User not found'));
        }
        done(null, results[0]);
    } catch (error) {
        done(error);
    }
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

app.post('/login', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/',
    failureFlash: false
}));

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login page.html'));
});

app.get('/index', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/recommendation', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'recommendation.html'));
});

app.get('/search', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'search.html'));
});

app.get('/feedback', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'feedback.html'));
});

app.get('/about', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'about.html'));
});

app.get('/booksummary', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'booksummary.html'));
});

// Add more protected routes here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
