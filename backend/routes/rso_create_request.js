const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/", (req, res) => {
  const { user_id, rso_name, administrator_email, emails, initialNumOfMembers, UNI_ID } = req.body;

  const query =
  "INSERT INTO rso_create_requests (user_id, rso_name, administrator_email, emails, initialNumOfMembers, UNI_ID) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [user_id, rso_name, administrator_email, emails, initialNumOfMembers, UNI_ID];

  db.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding request to database" });
    } else {
      console.log("RSO created: " + rso_name);
      res.status(200).json({ message: "RSO request successfully submitted" });
    }
  });
});

module.exports = router;
