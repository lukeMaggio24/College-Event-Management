const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  const query = "SELECT * FROM rso";

  db.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching RSO data" });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;