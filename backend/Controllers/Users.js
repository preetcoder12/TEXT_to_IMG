require("dotenv").config();
<<<<<<< HEAD
const bcrypt = require("bcrypt");
=======
const bcrypt = require('bcryptjs');
>>>>>>> 9e52e56 (tested ok)
const User = require("../Model/User");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Missing credentials" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", data: { username, email } });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing credentials" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE || "1h",
        });

        return res.status(200).json({
            message: "User signed in successfully",
            token,
            data: { username: user.username, email: user.email },
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { signupUser, signinUser };
