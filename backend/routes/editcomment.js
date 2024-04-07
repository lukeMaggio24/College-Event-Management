const express = require("express");
const router = express.Router();
const db = require("../database");

router.put("/", (req, res) => {
  const { id, comment, rating } = req.body;

  const query = "UPDATE comments SET comment = ?, rating = ? WHERE id = ?";
  const values = [comment, rating, id];

  db.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating comment in database" });
    } else {
      res.status(200).json({
        message: "Comment successfully updated",
        id: id,
        comment: comment,
        rating: rating,
      });
    }
  });
});

module.exports = router;
