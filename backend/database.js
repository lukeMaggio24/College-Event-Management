const dbConfig = {
    host: 'localhost',
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: 'mydatabase',
  };

  module.exports = dbConfig;

// do this in order to interact with database.
// import mysql from 'mysql2';
// import dbConfig from './dbConfig';
// const connection = mysql.createConnection(dbConfig);

