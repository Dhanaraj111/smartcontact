// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Define a new Mongoose schema for the 'Contact' model
const contactSchema = new mongoose.Schema({
    // 'userId' field stores the ObjectId of the user who owns the contact
    // It references the 'User' model using the `ref` option
    // This helps in setting up a relationship between the Contact and User models
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Type is ObjectId (MongoDB's unique identifier)
        ref: 'User' // This references the 'User' model, establishing a relationship
    },

    // 'name' field stores the name of the contact
    name: String,

    // 'email' field stores the email of the contact
    email: String,

    // 'phone' field stores the phone number of the contact
    phone: String,
});

// Create and export the 'Contact' model based on the 'contactSchema'
// The model interacts with the 'contacts' collection in MongoDB
module.exports = mongoose.model('Contact', contactSchema);