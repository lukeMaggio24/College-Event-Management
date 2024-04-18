const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  const { email } = req.query;
  console.log(`Email: ${email}`); // This will print the email

  // get all public and private events, and only get RSO events if the user is a member or admin of the RSO
  const query = `
  SELECT events.* 
  FROM events 
  LEFT JOIN rso ON events.rso_name = rso.rso_name 
  WHERE events.event_visibility != 'RSO Event' 
  OR FIND_IN_SET(?, REPLACE(rso.member_emails, '\n', ',')) > 0 
  OR rso.administrator_email = ?
  `;

  db.query(query, [email, email], (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching events" });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;
