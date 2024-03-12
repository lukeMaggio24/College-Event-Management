const mysql = require('mysql2');
const dbConfig = require('../database.js');

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Get a promise-based instance of the pool
const promisePool = pool.promise();

// Query to fetch the first_name column from the customers table
const query = 'SELECT first_name FROM customers';

// Execute the query
promisePool.query(query)
  .then(([rows, fields]) => {
    // 'rows' contains the rows returned by the query
    rows.forEach(row => {
      console.log(row.first_name);
    });
  })
  .catch(error => {
    console.error('Error fetching first names:', error);
  });
