const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  const values = [email];

  db.query(query, values, async (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error logging in user" });
    } else if (results.length > 0) {
      const match = await bcrypt.compare(password, results[0].password);
      if (match) {
        console.log("User logged in: " + email);
        res.status(200).json({
          message: "User logged in successfully",
          role: results[0].role,
          id: results[0].id,
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  });
});

module.exports = router;
