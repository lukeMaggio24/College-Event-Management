const express = require("express");
const router = express.Router();
const db = require("../database");

router.delete("/", (reg, res) => {
    const {id} = reg.body;

    query = "DELETE FROM rso_join_request WHERE id = ?";
    db.query(query, [id], (error, results) => {
        if(error)
        {
            console.log(error);
            res.status(500).json({message: "Error Denying Request"});
        }
        else if(results.length <= 0)
        {
            res.status(404).json({message: "RSO join request not found"});
        }
        else
        {
            res.status(200).json({message: "Denial successful"});
        }
    });
});

module.exports = router;