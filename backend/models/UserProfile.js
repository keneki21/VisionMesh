const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        unique: true 
    },
    fullName: { type: String, default: '' },
    bio: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    // Social media links
    socialLinks: {
        twitter: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        facebook: { type: String, default: '' }
    },
    // Additional preferences
    preferences: {
        theme: { type: String, default: 'dark' },
        language: { type: String, default: 'en' },
        notifications: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: true }
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("UserProfile", UserProfileSchema);
