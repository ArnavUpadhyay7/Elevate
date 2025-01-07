const Coach = require("../models/coach.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Coach Signup
exports.coachSignup = async (req, res) => {
    const { fullname, email, password, about, rank, role, rate, profilePic, coachBanner } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCoach = new Coach({ fullname, email, password: hashedPassword, about, rank, role, rate, profilePic, coachBanner });
        await newCoach.save();
        
        const token = jwt.sign({ id: newCoach._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie('token', token);
        res.status(201).json({ message: 'Coach registered successfully', coach: newCoach });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Coach Login
exports.coachLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const coach = await Coach.findOne({ email }).select('+password');
        if (!coach || !(await bcrypt.compare(password, coach.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: coach._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie('token', token);
        res.status(200).json({ message: 'Login successful', coach });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Coach Profile
exports.coachProfile = async (req, res) => {
    try {
        if (!req.coach) return res.status(404).json({ message: 'Coach not found' });
        res.status(200).json(req.coach);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Coach Logout
exports.coachLogout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

exports.checkAuthCoach = (req, res) => {
    try {
        res.status(200).json({ coach: req.coach });
    } catch (error) {
        console.log("Error checking coach authentication: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
