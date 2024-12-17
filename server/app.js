const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoutes = require('./routes/OTPAuth.js');
const adminValidate = require('./routes/validateAdmin.js');
const { connectDB } = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' http://localhost:3043; script-src 'self'; style-src 'self';");
    next();
});

// Routes
app.use('/api', authRoutes);
app.use('/api', adminValidate);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on PORT http://localhost:${PORT}/`);
});
