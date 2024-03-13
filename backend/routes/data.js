const express = require('express');
const mysql = require('mysql2');
const dbConfig = require('../database.js');

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Get a promise-based instance of the pool
const promisePool = pool.promise();

// Create an Express router
const router = express.Router();

// Define a route to fetch the first_name column from the customers table
router.get('/firstname', async (req, res) => {
  try {
    const query = 'SELECT first_name FROM customers';
    const [rows, fields] = await promisePool.query(query);
    res.json(rows.map(row => row.first_name));
  } catch (error) {
    console.error('Error fetching first names:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;