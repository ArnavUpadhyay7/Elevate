const Player = require('../models/player.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Player Signup
exports.playerSignup = async (req, res) => {
    const { fullname, email, password, about, rank, role, profilePic, playerBanner } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPlayer = new Player({ fullname, email, password: hashedPassword, about, rank, role, profilePic, playerBanner });
        await newPlayer.save();
        
        const token = jwt.sign({ id: newPlayer._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie('token', token);
        res.status(201).json({ message: 'Player registered successfully', player: newPlayer });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Player Login
exports.playerLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const player = await Player.findOne({ email }).select('+password');
        if (!player || !(await bcrypt.compare(password, player.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie('token', token);
        res.status(200).json({ message: 'Login successful', player }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Player Profile
exports.playerProfile = async (req, res) => {
    try {
        if (!req.player) return res.status(404).json({ message: 'Player not found' });
        res.status(200).json(req.player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Player Logout
exports.playerLogout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

exports.checkAuthPlayer = (req, res) => {
    try {
        res.status(200).json({ player: req.player });
    } catch (error) {
        console.log("Error checking player authentication: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
