const express = require('express');

const { getContacts, addContact, updateContact, deleteContact } = require('../controllers/contactController');


const authMiddleware = require('../middleware/authMiddleware');

// Create a new instance of an Express router
const router = express.Router();

// Apply authentication middleware for all routes in this router
// This ensures that all requests to these routes are authenticated
router.use(authMiddleware);


router.get('/', getContacts);


router.post('/', addContact);


router.put('/:id', updateContact);


router.delete('/:id', deleteContact);

// Export the router so it can be used in other parts of the application
module.exports = router;