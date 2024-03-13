// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const customersRoute = require('./routes/data.js'); // Import the route from data.js

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Use the /customers route from data.js
app.use('/customers', customersRoute);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});