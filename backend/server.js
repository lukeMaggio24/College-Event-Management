// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const dbConfig = require('./database');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
