const express = require("express");
const router = express.Router();
const db = require("../database");

router.delete("/", (req, res) => {
  const { id } = req.body;
  const query = "DELETE FROM rso_create_requests WHERE id = ?";

  db.query(query, [id], (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting request" });
    } else {
      res.status(200).json({ message: "Request deleted successfully" });
    }
  });
});

module.exports = router;
