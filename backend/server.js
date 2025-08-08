// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

// Initialize dotenv to use environment variables
dotenv.config();
connectDB();
// Initialize the express app
const app = express();

// Set up middleware
// CORS - Allows cross-origin requests
app.use(cors());
// Body Parser - Allows us to parse JSON in the body of requests
app.use(express.json());
app.use('/api/users', userRoutes);
// A simple test route to make sure everything is working
app.get('/', (req, res) => {
    res.send('NoteNest API is running...');
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});