const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// HARD-CODED JWT SECRET (no env)
const JWT_SECRET = "MY_SUPER_SECRET_KEY_123456";

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password)
            return res.status(400).json({ msg: "All fields are required" });

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ msg: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.json({ msg: "User registered successfully", user: user._id });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ msg: "All fields required" });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid password" });

        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            msg: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
