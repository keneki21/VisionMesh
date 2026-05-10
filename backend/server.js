const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();
const passport = require("./config/passport");

const app = express();

// Trust Railway's reverse proxy so req.protocol is 'https' in production
app.set("trust proxy", 1);

// CORS configuration to allow credentials
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow DELETE method
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow Authorization header
}));

app.use(express.json());
app.use(cookieParser());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || "MY_SESSION_SECRET_KEY_123456",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB (NO .env)
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/visionmesh";

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/evaluate", require("./routes/evaluate"));
app.use("/api/evaluate-url", require("./routes/evaluateUrl"));
app.use("/api/history", require("./routes/history"));
app.use("/api/code-generation", require("./routes/codeGeneration"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
