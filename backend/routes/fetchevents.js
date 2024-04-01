const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  const query = "SELECT * FROM events"; // Changed the query to select all from events

  db.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching events" }); // Changed the error message to reflect the new functionality
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;