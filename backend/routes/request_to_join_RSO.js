const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/", (req, res) => {
  const { rso_name, email } = req.body;

  const checkQuery = "SELECT rso_name from rso WHERE rso_name = ?";
  console.log("rso_name " + rso_name);
  db.query(checkQuery, [rso_name], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error checking for RSO" });
    } else if (results.length <= 0) {
      res.status(404).json({ message: "RSO does not exist" });
    } else {
      const insertQuery =
        "INSERT INTO rso_join_request (rso_name, email) VALUES (?, ?)";
      const values = [rso_name, email];

      db.query(insertQuery, values, (error, results, fields) => {
        if (error) {
          console.log(error);
          res.status(500).json({ message: "Error creating join RSO Request" });
        } else {
          console.log("RSO join request created");
          res.status(200).json({ message: "RSO Join request created" });
        }
      });
    }
  });
});

module.exports = router;
