const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  const rsoName = req.query.rso_name;
  const query = "SELECT administrator_email FROM rso WHERE rso_name = ?";
  db.query(query, [rsoName], (error, results, fields) => {
    if (error) {
      console.log(error); // Log any SQL errors
      res.status(500).json({ message: "Error fetching RSO data" });
    } else if (results.length === 0) {
      console.log(`No results found for rsoName: ${rsoName}`); // Log if no results were found
      res.status(404).json({ message: "No RSO found with the provided name" });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;