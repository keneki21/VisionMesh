const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const passport = require("passport");
const { generateVerificationCode, sendVerificationEmail } = require("../config/email");

const router = express.Router();

// Use JWT_SECRET from env
const JWT_SECRET = process.env.JWT_SECRET || "MY_SUPER_SECRET_KEY_123456";

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

        // Generate verification code
        const verificationCode = generateVerificationCode();
        const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            isVerified: false,
            verificationCode,
            verificationCodeExpires
        });

        // Send verification email
        const emailSent = await sendVerificationEmail(email, username, verificationCode);
        
        if (!emailSent) {
            console.warn('Failed to send verification email, but user was created');
        }

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
            msg: "User registered successfully. Please check your email for verification code.", 
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified
            },
            requiresVerification: true
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
                email: user.email,
                isVerified: user.isVerified
            },
            requiresVerification: !user.isVerified
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

// VERIFY EMAIL
router.post("/verify-email", authMiddleware, async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ msg: "Verification code is required" });
        }

        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ msg: "Email already verified" });
        }

        if (!user.verificationCode || !user.verificationCodeExpires) {
            return res.status(400).json({ msg: "No verification code found. Please request a new one." });
        }

        if (new Date() > user.verificationCodeExpires) {
            return res.status(400).json({ msg: "Verification code has expired. Please request a new one." });
        }

        if (user.verificationCode !== code) {
            return res.status(400).json({ msg: "Invalid verification code" });
        }

        // Verify the user
        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save();

        res.json({ 
            msg: "Email verified successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

// RESEND VERIFICATION CODE
router.post("/resend-verification", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ msg: "Email already verified" });
        }

        // Generate new verification code
        const verificationCode = generateVerificationCode();
        const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.verificationCode = verificationCode;
        user.verificationCodeExpires = verificationCodeExpires;
        await user.save();

        // Send verification email
        const emailSent = await sendVerificationEmail(user.email, user.username, verificationCode);
        
        if (!emailSent) {
            return res.status(500).json({ msg: "Failed to send verification email" });
        }

        res.json({ msg: "Verification code sent successfully" });

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
                profilePicture: user.profilePicture || null,
                authProvider: user.authProvider,
                isVerified: user.isVerified,
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

// GOOGLE OAUTH ROUTES
// Initiate Google OAuth
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

// Google OAuth callback
router.get("/google/callback", 
    passport.authenticate("google", { failureRedirect: "/login" }),
    async (req, res) => {
        try {
            // Generate JWT token for the user
            const token = jwt.sign(
                { id: req.user._id },
                JWT_SECRET,
                { expiresIn: "7d" }
            );

            // Set JWT in cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: "lax"
            });

            // Set user session
            req.session.userId = req.user._id;

            console.log("Google OAuth Success - User:", req.user.email, "Verified:", req.user.isVerified);

            // OAuth users are always verified, redirect directly to home
            res.redirect(`${process.env.FRONTEND_URL}/home`);
        } catch (err) {
            console.error("Google OAuth Callback Error:", err);
            res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
        }
    }
);

// GITHUB OAUTH ROUTES
// Initiate GitHub OAuth
router.get("/github", passport.authenticate("github", {
    scope: ["user:email"]
}));

// GitHub OAuth callback
router.get("/github/callback", 
    passport.authenticate("github", { failureRedirect: "/login" }),
    async (req, res) => {
        try {
            // Generate JWT token for the user
            const token = jwt.sign(
                { id: req.user._id },
                JWT_SECRET,
                { expiresIn: "7d" }
            );

            // Set JWT in cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: "lax"
            });

            // Set user session
            req.session.userId = req.user._id;

            console.log("GitHub OAuth Success - User:", req.user.email, "Verified:", req.user.isVerified);

            // OAuth users are always verified, redirect directly to home
            res.redirect(`${process.env.FRONTEND_URL}/home`);
        } catch (err) {
            console.error("GitHub OAuth Callback Error:", err);
            res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
        }
    }
);

// DELETE ACCOUNT (Protected Route)
router.delete("/delete-account", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        // Find and delete the user
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Clear cookie
        res.clearCookie("token");

        // Destroy session
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
            }
        });

        console.log("Account deleted:", user.email);

        res.json({ msg: "Account deleted successfully" });
    } catch (err) {
        console.error("Delete account error:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
