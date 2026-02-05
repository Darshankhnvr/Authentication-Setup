const User = require("../models/User");
const bcrypt = require("bcryptjs");

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
exports.signup = async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        user = await User.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
        });

        res.status(201).json({
            message: "Signup successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
        });
    } catch (error) {
        console.error(`Signup error: ${error.message}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
        });
    } catch (error) {
        console.error(`Login error: ${error.message}`);
        res.status(500).json({ message: "Internal server error" });
    }
};
