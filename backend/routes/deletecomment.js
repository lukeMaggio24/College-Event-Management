const express = require("express");
const router = express.Router();
const db = require("../database");

router.delete("/", (req, res) => {
  const { id } = req.query;

  const query = "DELETE FROM comments WHERE id = ?";
  const values = [id];

  db.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting comment from database" });
    } else {
      res.status(200).json({ message: "Comment successfully deleted" });
    }
  });
});

module.exports = router;
