const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
    const rso_name = req.query.rso_name;
    qzery = "SELECT numOfMembers FROM rso WHERE rso =?";

    db.query(query, [rso_name], (error, results) => {
        if (error) {
        console.log(error);
        res.status(500).json({ message: "Error" });
        } else {
        console.log("RSO numOfMembers retrieved");
        res.status(200).json(results);
        }
    });
});

module.exports = router;
