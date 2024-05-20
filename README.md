# E-Library

## Overview
E-Library is a simple yet elegant application designed to facilitate online book management. It features a user-friendly interface built with HTML and CSS on the frontend and leverages Node.js and MySQL for the backend. Users can register, log in, and manage their library seamlessly.

## Features
- User Registration: Create a new account to access the library.
- User Login: Secure login functionality to access personal library features.
- Elegant Frontend: Simple and intuitive interface designed with HTML and CSS.
- Robust Backend: Built with Node.js and MySQL for reliable data handling.

## Prerequisites
To run this application, you need to have the following installed on your system:
- Node.js
- MySQL

## Installation and Setup

1. **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/e-library.git
    cd e-library
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Configure the Database**
    - Create a database in MySQL.
    - Update the database configuration in the `config/database.js` file with your MySQL credentials.

    ```js
    module.exports = {
        host: 'localhost',
        user: 'your-username',
        password: 'your-password',
        database: 'e_library'
    };
    ```

    - Import the database schema provided in `schema.sql` to set up the necessary tables.

4. **Run the Application**
    You can run the application using Node.js or Nodemon for automatic restarts on file changes.

    **Using Node.js:**
    ```bash
    node app.js
    ```

    **Using Nodemon:**
    ```bash
    nodemon app.js
    ```

## Usage

1. **Register a User**
    - Open your browser and navigate to `http://localhost:3000/register`.
    - Fill in the registration form and submit to create a new account.

2. **Login**
    - Navigate to `http://localhost:3000/login`.
    - Enter your credentials and log in to access the library.

## Project Structure
- `app.js`: Main application file.
- `public/`: Contains the static files (HTML, CSS).
- `routes/`: Contains the route handlers.
- `config/`: Contains configuration files for the database.

## Contribution
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## Acknowledgements
- Node.js for the backend runtime.
- MySQL for the database management.
- Express.js for simplifying the routing.
