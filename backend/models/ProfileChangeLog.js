const mongoose = require("mongoose");

const ProfileChangeLogSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserProfile', 
        required: true
    },
    changedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    changeType: {
        type: String,
        enum: ['create', 'update'],
        required: true
    },
    // Complete state BEFORE the change
    beforeState: {
        fullName: String,
        bio: String,
        phone: String,
        location: String,
        website: String,
        socialLinks: {
            twitter: String,
            linkedin: String,
            facebook: String
        }
    },
    // Complete state AFTER the change
    afterState: {
        fullName: String,
        bio: String,
        phone: String,
        location: String,
        website: String,
        socialLinks: {
            twitter: String,
            linkedin: String,
            facebook: String
        }
    },
    // List of fields that were modified
    fieldsChanged: [String],
    // User info at time of change
    userInfo: {
        username: String,
        email: String
    },
    ipAddress: String,
    userAgent: String
}, { timestamps: true });

// Index for faster queries
ProfileChangeLogSchema.index({ userId: 1, createdAt: -1 });
ProfileChangeLogSchema.index({ profileId: 1 });

module.exports = mongoose.model("ProfileChangeLog", ProfileChangeLogSchema);
