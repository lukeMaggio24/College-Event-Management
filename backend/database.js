require('dotenv').config();

const dbConfig = {
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'testdata',
  };

  console.log(process.env.DB_USERNAME, process.env.DB_PASSWORD);
  module.exports = dbConfig;

// do this in order to interact with database.
// import mysql from 'mysql2';
// import dbConfig from './dbConfig';
// const connection = mysql.createConnection(dbConfig);

