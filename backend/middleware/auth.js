const jwt = require("jsonwebtoken");

// HARD-CODED JWT SECRET (should match the one in routes/auth.js)
const JWT_SECRET = "MY_SUPER_SECRET_KEY_123456";

const authMiddleware = (req, res, next) => {
    try {
        // Get token from cookie first, then header
        let token = req.cookies.token;
        
        if (!token) {
            // Fallback to Authorization header
            token = req.header("Authorization")?.replace("Bearer ", "");
        }

        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Add user from payload
        req.user = decoded;
        
        // Store user in session
        req.session.userId = decoded.id;
        
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = authMiddleware;
