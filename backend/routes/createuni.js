const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/", (req, res) => {
  const { name, numOfStudents, universityDomain, description } = req.body;

  const checkQuery = "SELECT * FROM universities WHERE name = ?";
  db.query(checkQuery, [name], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error checking university name" });
    } else if (results.length > 0) {
      res.status(400).json({ message: "University name already taken" });
    } else {
      const insertQuery =
        "INSERT INTO universities (name, numOfStudents, university_domain, description) VALUES (?, ?, ?, ?)";
      const values = [name, numOfStudents, universityDomain, description];

      db.query(insertQuery, values, (error, results, fields) => {
        if (error) {
          console.log(error);
          if (
            error.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD" ||
            error.code === "ER_WARN_INVALID_NUMBER"
          ) {
            res.status(400).json({
              message:
                "Invalid value for number of students. It should be an integer.",
            });
          } else {
            res
              .status(500)
              .json({ message: "Error creating university profile" });
          }
        } else {
          console.log("University profile created: " + name);
          res
            .status(200)
            .json({ message: "University profile created successfully" });
        }
      });
    }
  });
});

module.exports = router;
