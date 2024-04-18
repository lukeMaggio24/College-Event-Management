const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
    const time = req.query.time;
    const query = "SELECT time FROM events WHERE time = ?";
    
    db.query(query, [time], (error, results) => {
        if(error) {
            console.log(error);
            res.status(500).json({ message: "Error fetching university"})
        }
        else if(results.length === 0)
        {
            res.status(404).json({ message: "University not found"});
        }
        else {
            res.status(200).json(results[0]);
        }
    })
});

module.exports = router;