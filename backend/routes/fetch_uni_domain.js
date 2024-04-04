const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
    const uniID = req.query.id;
    console.log(uniID);
    const query = "SELECT university_domain FROM universities WHERE id = ?";

    db.query(query, [uniID], (error, results) => {
        if(error) {
            console.log(error);
            res.status(500).json({ message: "Error fetching university domain"})
        }
        else {
            res.status(200).json(results[0]);
        }
    })
});

module.exports = router;