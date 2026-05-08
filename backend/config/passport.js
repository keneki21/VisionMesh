const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("Google Profile:", profile); // Debug log

                // Check if user exists with this Google ID
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    // User exists, return user
                    console.log("Existing Google user found:", user.email);
                    return done(null, user);
                }

                // Check if user exists with this email (from local auth)
                user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    // Link Google account to existing user
                    user.googleId = profile.id;
                    user.profilePicture = profile.photos?.[0]?.value || null;
                    user.authProvider = 'google';
                    await user.save();
                    console.log("Linked Google to existing user:", user.email);
                    return done(null, user);
                }

                // Create new user with Google data
                user = await User.create({
                    username: profile.displayName || profile.emails[0].value.split('@')[0],
                    email: profile.emails[0].value,
                    password: "google-oauth-" + profile.id, // Placeholder password for OAuth users
                    googleId: profile.id,
                    profilePicture: profile.photos?.[0]?.value || null,
                    authProvider: 'google'
                });

                console.log("New Google user created:", user.email);
                return done(null, user);

            } catch (err) {
                console.error("Passport Google Strategy Error:", err);
                return done(err, null);
            }
        }
    )
);

// GitHub OAuth Strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/api/auth/github/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("GitHub Profile:", profile); // Debug log

                // Check if user exists with this GitHub ID
                let user = await User.findOne({ githubId: profile.id });

                if (user) {
                    // User exists, update profile picture if needed
                    const avatarUrl = profile.photos?.[0]?.value || profile._json?.avatar_url || null;
                    if (avatarUrl && user.profilePicture !== avatarUrl) {
                        user.profilePicture = avatarUrl;
                        await user.save();
                    }
                    console.log("Existing GitHub user found:", user.email);
                    return done(null, user);
                }

                // GitHub email might not be available or might be array
                const email = profile.emails?.[0]?.value || `${profile.username}@github.oauth`;
                const avatarUrl = profile.photos?.[0]?.value || profile._json?.avatar_url || null;

                // Check if user exists with this email (from local auth)
                if (profile.emails?.[0]?.value) {
                    user = await User.findOne({ email: profile.emails[0].value });

                    if (user) {
                        // Link GitHub account to existing user
                        user.githubId = profile.id;
                        user.profilePicture = avatarUrl;
                        user.authProvider = 'github';
                        await user.save();
                        console.log("Linked GitHub to existing user:", user.email);
                        return done(null, user);
                    }
                }

                // Create new user with GitHub data
                user = await User.create({
                    username: profile.username || profile.displayName || email.split('@')[0],
                    email: email,
                    password: "github-oauth-" + profile.id, // Placeholder password for OAuth users
                    githubId: profile.id,
                    profilePicture: avatarUrl,
                    authProvider: 'github'
                });

                console.log("New GitHub user created:", user.email);
                return done(null, user);

            } catch (err) {
                console.error("Passport GitHub Strategy Error:", err);
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
