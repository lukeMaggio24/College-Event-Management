const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME, // username was a reserved word lol
  password: process.env.DB_PASSWORD,
  database: "mydatabase",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected...");
});

module.exports = db;
