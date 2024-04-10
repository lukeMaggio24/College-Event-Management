const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  const rsoName = req.query.rso_name;
  const email = req.query.email;

  const query = "SELECT * FROM rso WHERE rso_name = ?";

  db.query(query, [rsoName], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching RSO" });
    } else if (results.length <= 0) {
      res.status(404).json({ message: "RSO does not exist" });
    } else {
      const rso = results[0];
      const members = rso.member_emails.split("\n");

      if (!members.includes(email) && rso.administrator_email !== email) {
        res.status(403).json({ message: "You are not a part of this RSO" });
        return;
      }

      rso.member_emails = members.filter((e) => e !== email).join("\n");
      if (rso.administrator_email === email) {
        rso.administrator_email = null;
      }

      const updateQuery =
        "UPDATE rso SET member_emails = ?, administrator_email = ? WHERE rso_name = ?";
      db.query(
        updateQuery,
        [rso.member_emails, rso.administrator_email, rsoName],
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({ message: "Error updating RSO" });
          } else {
            res.status(200).json({ message: "Successfully left RSO" });
          }
        }
      );
    }
  });
});

module.exports = router;
