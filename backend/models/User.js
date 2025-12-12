const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String, sparse: true, unique: true }, // Google OAuth ID
    githubId: { type: String, sparse: true, unique: true }, // GitHub OAuth ID
    profilePicture: { type: String }, // Profile picture URL
    authProvider: { type: String, default: 'local' }, // 'local', 'google', or 'github'
    isVerified: { type: Boolean, default: false }, // Email verification status
    verificationCode: { type: String }, // 6-digit verification code
    verificationCodeExpires: { type: Date } // Expiry time for the code
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
