const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
    const email = req.query.administrator_email;
    const query = "SELECT id FROM users WHERE email = ?";
    
    db.query(query, [email], (error, results) => {
        if(error) {
            console.log(error);
            res.status(500).json({ message: "Error fetching ID"})
        }
        else if(results.length === 0)
        {
            res.status(404).json({ message: "ID not found"});
        }
        else {
            res.status(200).json(results[0]);
        }
    })
});

module.exports = router;