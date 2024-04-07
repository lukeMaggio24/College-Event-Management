const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/", (req, res) => {
  const { comment, event_id, rating, user_id } = req.body;

  const query =
    "INSERT INTO comments (comment, event_id, rating, user_id) VALUES (?, ?, ?, ?)";
  const values = [comment, event_id, rating, user_id];

  db.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding comment to database" });
    } else {
      res.status(200).json({
        message: "Comment successfully added",
        id: results.insertId,
        comment: comment,
      });
    }
  });
});

module.exports = router;
