const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
    query = "SELECT * FROM rso_join_request";

    db.query(query, (error, results) => {
        if(error) {
            console.log(error);
            res.status(500).json({message: "Error fetching from rso_join_request"});
        }
        else {
            console.log("RSO join requests retrieved");
            res.status(200).json(results);
        }
    });
});

module.exports = router;