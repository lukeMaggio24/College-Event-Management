const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/", (req, res) => {
  const { email, password, role, university, rso } = req.body;

  const query =
    "INSERT INTO users (email, password, role, university, rso) VALUES (?, ?, ?, ?, ?)";
  const values = [email, password, role, university, rso];

  db.query(query, values, (error, results, fields) => {
    if (error) {
      if (error.code === "ER_DUP_ENTRY") {
        res.status(409).json({ message: "Email already in use" });
      } else {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
      }
    } else {
      console.log("User created: " + email);
      res.status(200).json({ message: "User created successfully" });
    }
  });
});

module.exports = router;
