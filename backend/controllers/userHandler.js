const User = require("../models/user");
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: "Error is hashing password",
            });
        }

        // Create a new user
        const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });

        newUser.password = "";

        if (newUser) {
            res.status(200).json({
                success: true,
                message: "User created successfully.",
                user: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    id: newUser._id
                }
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Failed to create user.",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred during signup.",
            error: error.message,
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for missing credentials
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter the email and password",
            });
        }

        // Check if the user is registered or not
        const existingUser = await User.findOne({ email }).populate('posts');
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist.",
            });
        }

        // Password check
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password.',
            });
        }

        let user = existingUser.toObject();
        user.password = "";

        // Sending the response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: e.message,
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).populate('posts');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        user.password = "";
        user.token = "";

        res.status(200).json(
            user
        );
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}