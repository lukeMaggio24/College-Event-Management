const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/", (req, res) => {
  const {
    university_name,
    event_name,
    event_category,
    event_visibility,
    description,
    date,
    time,
    contact_phone,
    contact_email,
    latitude,
    longitude,
  } = req.body;

  const query =
    "INSERT INTO Events (university_name, event_name, event_category, event_visibility, description, date, time, contact_phone, contact_email, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    university_name,
    event_name,
    event_category,
    event_visibility,
    description,
    date,
    time,
    contact_phone,
    contact_email,
    latitude,
    longitude,
  ];

  db.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating event" });
    } else {
      console.log("Event created: " + event_name);
      res.status(200).json({ message: "Event created successfully" });
    }
  });
});

module.exports = router;
