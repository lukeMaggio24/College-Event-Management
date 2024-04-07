const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  const eventId = req.query.id;
  const query = "SELECT * FROM comments WHERE event_id = ?";

  db.query(query, [eventId], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching comments" });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
