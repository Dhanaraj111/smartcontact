// Import the Contact model to interact with the contacts collection in the database
const Contact = require('../models/Contact');

// Controller to get all contacts for the logged-in user
exports.getContacts = async(req, res) => {
    try {
        // Find all contacts that belong to the logged-in user (based on userId)
        const contacts = await Contact.find({ userId: req.user.id });

        // Return the contacts as a JSON response
        res.json(contacts);
    } catch (err) {
        // If an error occurs, send a 500 status code with a server error message
        res.status(500).send('Server Error');
    }
};

// Controller to add a new contact for the logged-in user
exports.addContact = async(req, res) => {
    // Destructure the contact details (name, email, phone) from the request body
    const { name, email, phone } = req.body;

    try {
        // Create a new Contact document for the logged-in user
        const contact = new Contact({
            userId: req.user.id, // Set the userId to the logged-in user's ID
            name,
            email,
            phone
        });

        // Save the new contact to the database
        await contact.save();

        // Return the newly created contact as a JSON response
        res.json(contact);
    } catch (err) {
        // If an error occurs, send a 500 status code with a server error message
        res.status(500).send('Server Error');
    }
};

// Controller to update an existing contact for the logged-in user
exports.updateContact = async(req, res) => {
    // Destructure the updated contact details (name, email, phone) from the request body
    const { name, email, phone } = req.body;

    try {
        // Find the contact by its ID and userId, and update the contact details
        const contact = await Contact.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, // Match by contact ID and userId
            { name, email, phone }, // Updated fields
            { new: true } // Return the updated contact
        );

        // If the contact is not found, return a 404 status code with an error message
        if (!contact) return res.status(404).json({ message: 'Contact not found' });

        // Return the updated contact as a JSON response
        res.json(contact);
    } catch (err) {
        // If an error occurs, send a 500 status code with a server error message
        res.status(500).send('Server Error');
    }
};

// Controller to delete a contact for the logged-in user
exports.deleteContact = async(req, res) => {
    try {
        // Find the contact by its ID and userId, and delete the contact
        const contact = await Contact.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

        // If the contact is not found, return a 404 status code with an error message
        if (!contact) return res.status(404).json({ message: 'Contact not found' });

        // Return a success message after the contact is deleted
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        // If an error occurs, send a 500 status code with a server error message
        res.status(500).send('Server Error');
    }
};