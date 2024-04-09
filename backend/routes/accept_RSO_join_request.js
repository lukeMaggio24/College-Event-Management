const express = require("express");
const router = express.Router();
const db = require("../database");

router.post("/", (req, res) => {
    const {rso_name, email} = req.body;

    const query = "UPDATE rso SET member_emails = CONCAT(IFNULL(member_emails, ''), ?, ' ') WHERE rso_name = ?";

    db.query(query, [email, rso_name], (error, results) => {
        if(error) {
            console.log(error);
            res.status(500).json({message: "Error accepting RSO join request"});
        }
        else if(results.length <= 0) {
            res.status(404).json({message: "rso does not exist"});
        }
        else {
            const queryIncrement = "UPDATE rso SET numOfMembers = numOfMembers + 1 Where rso_name = ?";
            db.query(queryIncrement, rso_name, (error, results) => {
                if(error) {
                    console.log(error);
                    res.status(500).json({message: "Error increasing number of members"});
                }
                else {
                    res.status(200).json({message: "Successfully accepted"});
                }
            }) 
        }
    });
});

module.exports = router;