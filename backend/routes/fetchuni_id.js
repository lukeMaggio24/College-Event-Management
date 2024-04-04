const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
    const uniName = req.query.name;
    const query = "SELECT id FROM universities WHERE name = ?";
    
    db.query(query, uniName, (error, results) => {
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