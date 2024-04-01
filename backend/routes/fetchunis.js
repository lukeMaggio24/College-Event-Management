const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  const query = "SELECT name FROM universities";

  db.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching universities" });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
