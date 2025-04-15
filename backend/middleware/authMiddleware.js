const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library to verify JWT tokens

// This is the authentication middleware that protects routes requiring authentication
const authMiddleware = (req, res, next) => {
    // Extract the token from the 'Authorization' header of the request
    const token = req.header('Authorization');

    // If no token is provided, return a 401 Unauthorized response
    if (!token) return res.status(401).json({ message: 'No token, auth denied' });

    try {
        // Verify the token using the secret stored in environment variables
        // If valid, the decoded user data will be attached to the 'req.user' object
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded information to the request object, so it can be accessed later
        req.user = decoded;

        // Proceed to the next middleware or route handler (if the token is valid)
        next();
    } catch (err) {
        // If the token is invalid or expired, return a 401 Unauthorized response
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Export the middleware to be used in routes
module.exports = authMiddleware;