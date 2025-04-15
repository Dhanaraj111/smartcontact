// Import required modules
const bcrypt = require('bcryptjs'); // Library to hash and compare passwords
const jwt = require('jsonwebtoken'); // Library to create and verify JWT tokens
const User = require('../models/User'); // Import the User model from models directory

// Register function: Handles user registration
exports.register = async(req, res) => {
    // Destructure the name, email, and password from the request body
    const { name, email, password } = req.body;

    try {
        // Check if a user with the provided email already exists in the database
        let user = await User.findOne({ email });

        // If user exists, return a 400 status code with an error message
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with the hashed password
        user = new User({ name, email, password: hashedPassword });

        // Save the new user to the database
        await user.save();

        // Create a JWT token with the user's ID and an expiration time of 1 hour
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the JWT token back as a response
        res.json({ token });
    } catch (err) {
        // If an error occurs during the registration process, send a 500 status code with a generic server error message
        res.status(500).send("Server Error");
    }
};

// Login function: Handles user login
exports.login = async(req, res) => {
    // Destructure the email and password from the request body
    const { email, password } = req.body;

    try {
        // Find the user by their email in the database
        const user = await User.findOne({ email });

        // If the user doesn't exist, return a 400 status code with an error message
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // If the passwords don't match, return a 400 status code with an error message
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // If the password is correct, create a JWT token with the user's ID and an expiration time of 1 hour
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the JWT token back as a response
        res.json({ token });
    } catch (err) {
        // If an error occurs during the login process, send a 500 status code with a generic server error message
        res.status(500).send("Server Error");
    }
};