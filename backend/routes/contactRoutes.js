// Import the Express library to create the router
const express = require('express');

// Import controller functions for managing contacts (get, add, update, delete)
const { getContacts, addContact, updateContact, deleteContact } = require('../controllers/contactController');

// Import authentication middleware to verify if the user is authenticated
const authMiddleware = require('../middleware/authMiddleware');

// Create a new instance of an Express router
const router = express.Router();

// Apply authentication middleware for all routes in this router
// This ensures that all requests to these routes are authenticated
router.use(authMiddleware);

// Define the GET route for fetching contacts
// This route will handle GET requests to the /contacts endpoint
// It will call the getContacts function to retrieve the user's contacts
router.get('/', getContacts);

// Define the POST route for adding a new contact
// This route will handle POST requests to the /contacts endpoint
// It will call the addContact function to create a new contact for the user
router.post('/', addContact);

// Define the PUT route for updating an existing contact
// This route will handle PUT requests to the /contacts/:id endpoint
// It will call the updateContact function to update a contact based on the provided contact ID
router.put('/:id', updateContact);

// Define the DELETE route for deleting a contact
// This route will handle DELETE requests to the /contacts/:id endpoint
// It will call the deleteContact function to delete the contact based on the provided contact ID
router.delete('/:id', deleteContact);

// Export the router so it can be used in other parts of the application
module.exports = router;