// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Define a new Mongoose schema for the 'User' model
const userSchema = new mongoose.Schema({
    // 'name' field of type String to store user's name
    name: String,

    // 'email' field, must be a unique string to store the user's email
    email: {
        type: String, // The field type is String
        unique: true // Ensures that the email is unique across all users
    },

    // 'password' field of type String to store user's password (hashed)
    password: String,
});

// Create and export the 'User' model based on the 'userSchema'
// The model will interact with the 'users' collection in MongoDB
module.exports = mongoose.model('User', userSchema);