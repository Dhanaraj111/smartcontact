// Importing required modules
const express = require('express') // Express framework for building the server
const mongoose = require('mongoose') // Mongoose library for MongoDB connection and schema handling
const cors = require('cors') // Middleware to handle Cross-Origin Resource Sharing
require('dotenv').config() // Load environment variables from a .env file

// Importing route files
const authRoutes = require('./routes/authRoutes') // Routes related to authentication (login/register)
const contactRoutes = require('./routes/contactRoutes') // Routes related to contact management (CRUD operations)

// Initialize the Express application
const app = express()

// Middleware to enable CORS (allowing frontend to access backend)
app.use(cors())

// Middleware to parse incoming JSON requests
app.use(express.json())

// Mounting auth and contact route handlers under specific base URLs
app.use('/api/auth', authRoutes) // Routes under /api/auth go to authRoutes file
app.use('/api/contacts', contactRoutes) // Routes under /api/contacts go to contactRoutes file

// Connecting to MongoDB using the URI from .env file
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected') // Log success message when DB connection is established

    // Start the server and listen on port 5000
    app.listen(5000, () => console.log('Server running on port 5000'))
  })
  .catch(err => console.log(err)) // Log any errors that occur during DB connection
