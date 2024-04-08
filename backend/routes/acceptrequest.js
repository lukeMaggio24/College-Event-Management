const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/", (req, res) => {
  const { rso_owner_id, rso_name, administrator_email, member_emails, numOfMembers, UNI_id } =
    req.body;
  const active = 1;

  const checkQuery = "SELECT * FROM rso WHERE rso_name =?";
  db.query(checkQuery, [rso_name], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error checking for RSO" });
    } else if (results.length > 0) {
      res.status(400).json({ message: "RSO name already taken" });
    } else {
      const insertQuery =
        "INSERT INTO rso (rso_owner_id, rso_name, administrator_email, member_emails, numOfMembers, active, UNI_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const values = [
        rso_owner_id,
        rso_name,
        administrator_email,
        member_emails,
        numOfMembers,
        active,
        UNI_id,
      ];

      db.query(insertQuery, values, (error, results, fields) => {
        if (error) {
          console.log(error);
        } else {
          console.log("RSO profile create " + rso_name);
          res.status(200).json({ message: "RSO profile created successfully" });
        }
      });
    }
  });
});

module.exports = router;
