const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // fixed: use `headers` not `header`
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, "bookStore123", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is invalid" });
        }

        req.user = user; // store decoded data
        next();
    });
};

module.exports = { authenticateToken };
