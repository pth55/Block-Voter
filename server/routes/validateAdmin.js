// routes/validateAdmin.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

router.get('/validateAdmin/:name/:pass', async (req, res) => {
    const { name, pass } = req.params; // Directly using params without hashing
    try {
        const documents = await mongoose.connection.db.collection("admin").find({ uname: name, pass: pass }).toArray();

        if (!documents || documents.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Data Found"
            });
        }

        const response = { status: true, name: documents[0].name, email: documents[0].uname, phone: documents[0].phone};

        return res.status(200).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

module.exports = router;
