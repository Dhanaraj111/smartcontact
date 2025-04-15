// Import the Express library to create the router
const express = require('express');

// Import the register and login controller functions from the authController
const { register, login } = require('../controllers/authController');

// Create a new instance of an Express router
const router = express.Router();

// Define the /register POST route and associate it with the register function
// When a POST request is sent to /register, the register function will be executed
router.post('/register', register);

// Define the /login POST route and associate it with the login function
// When a POST request is sent to /login, the login function will be executed
router.post('/login', login);

// Export the router so it can be used in other parts of the application
module.exports = router;