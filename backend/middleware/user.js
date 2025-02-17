require("dotenv").config();

const jwt = require("jsonwebtoken");

const verifyToken = (rew, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.user;
        next();
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });

    }
}

module.exports = verifyToken;