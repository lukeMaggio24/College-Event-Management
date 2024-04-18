const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/", (req, res) => {
  const rso_name = req.body;

  const query =
  "UPDATE rso SET active = 0 Where rso_name = ?";

  db.query(query, [rso_name], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Error" });
    } else {
        res.status(200).json({message: "now inActive"});
    }
  });
});

module.exports = router;
