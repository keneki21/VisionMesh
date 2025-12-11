const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

// CORS configuration to allow credentials
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true // Allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

// Session configuration
app.use(session({
    secret: "MY_SESSION_SECRET_KEY_123456", // Should be in .env in production
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
}));

// MongoDB (NO .env)
const MONGO_URI = "mongodb://localhost:27017/visionmesh";

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));

// Routes
app.use("/auth", require("./routes/auth"));

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
