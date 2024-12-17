// routes/OTPAuth.js
const express = require('express');
const twilio = require('twilio');
const mongoose = require('mongoose');
const router = express.Router();
require('dotenv').config();

const { TWILIO_PHONE_NUMBER_1, TWILIO_PHONE_NUMBER_2, TWILIO_PHONE_NUMBER_3, ACCOUNT_SID_1, ACCOUNT_SID_2, ACCOUNT_SID_3, AUTH_TOKEN_1, AUTH_TOKEN_2, AUTH_TOKEN_3 } = process.env;

router.post('/validateVoter', async (req, res) => {
    const { aadhar } = req.body;

    try {
        const user = await mongoose.connection.db.collection('voters').findOne({ aadhar });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        let ACCOUNT_SID = null;
        let AUTH_TOKEN = null;
        let TWILIO_PHONE_NUMBER = null;
        let client = null;

        // Select Twilio credentials based on user phone number
        if (user.phone == "+918143091032" || user.phone == "8143091032") {
            ACCOUNT_SID = ACCOUNT_SID_1;
            AUTH_TOKEN = AUTH_TOKEN_1;
            TWILIO_PHONE_NUMBER = TWILIO_PHONE_NUMBER_1;
        } else if (user.phone == "+917989525936" || user.phone == "7989525936") {
            ACCOUNT_SID = ACCOUNT_SID_2;
            AUTH_TOKEN = AUTH_TOKEN_2;
            TWILIO_PHONE_NUMBER = TWILIO_PHONE_NUMBER_2;
        } else if (user.phone == "+916304521325" || user.phone == "6304521325") {
            ACCOUNT_SID = ACCOUNT_SID_3;
            AUTH_TOKEN = AUTH_TOKEN_3;
            TWILIO_PHONE_NUMBER = TWILIO_PHONE_NUMBER_3;
        }

        if (!ACCOUNT_SID || !AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
            return res.status(400).json({ success: false, message: 'Invalid phone number or Twilio credentials not set.' });
        }

        // Initialize the Twilio client
        client = twilio(ACCOUNT_SID, AUTH_TOKEN);

        // Send OTP
        await client.messages.create({
            body: `Your verification code is ${otp}`,
            to: user.phone,
            from: TWILIO_PHONE_NUMBER
        });

        // Store OTP in the user record
        await mongoose.connection.db.collection('voters').findOneAndUpdate(
            { aadhar },
            { $set: { otp, otpCreatedAt: new Date() } }
        );

        res.json({
            success: true,
            message: 'OTP sent successfully',
            phone: user.phone
        });

    } catch (error) {
        console.error('Error validating and sending OTP:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
});

router.post('/verifyCode', async (req, res) => {
    const { aadhar, code } = req.body;

    try {
        
        const user = await mongoose.connection.db.collection('voters').findOne({ aadhar: aadhar });

        // Check if user exists and OTP matches
        if (!user || user.otp !== code) {
            return res.status(401).json({ success: false, message: 'Invalid verification code' });
        }

        // Clear OTP after successful verification
        await mongoose.connection.db.collection('voters').findOneAndUpdate(
            { aadhar: aadhar },
            { $unset: { otp: "", otpCreatedAt: "" } }
        );

        res.status(200).json({ success: true, message: 'Verification successful!', name: user.name, email: user.uname, dob: user.dob, phone: user.phone}); // Use status 200 for success
    } catch (error) {
        console.error('Verification failed:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
