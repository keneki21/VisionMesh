const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

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

        // Generate token and set cookie
        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Set JWT in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "lax"
        });

        // Set user session
        req.session.userId = user._id;

        res.json({ 
            msg: "User registered successfully", 
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

        // Set JWT in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "lax"
        });

        // Set user session
        req.session.userId = user._id;

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

// GET USER PROFILE (Protected Route Example)
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        // req.user is set by authMiddleware
        const user = await User.findById(req.user.id).select("-password");
        
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

// VERIFY TOKEN (Check if token is valid)
router.get("/verify", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ valid: true, user: { id: user._id, email: user.email, username: user.username } });
    } catch (err) {
        res.status(401).json({ valid: false, msg: "Invalid token" });
    }
});

// LOGOUT (Clear cookie and session)
router.post("/logout", (req, res) => {
    try {
        // Clear cookie
        res.clearCookie("token");
        
        // Destroy session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ msg: "Error logging out" });
            }
            res.json({ msg: "Logged out successfully" });
        });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
