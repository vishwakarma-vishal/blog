const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        // secure hashed
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }catch(e){
            return  res.status(500).json({
                success: false,
                message: "Error is hashing password",
            });
        }

        // Create a new user
        const newUser = await User.create({ firstName, lastName, email, password:hashedPassword });

        if (newUser) {
            res.status(201).json({
                success: true,
                message: "User created successfully.",
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
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist.",
            });
        }

        // password check
        if (await bcrypt.compare(password, existingUser.password)) {
            // Generate JWT token
            const payload = {
                email: existingUser.email,
                id: existingUser._id,
            }

            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Sending the response with json token
             return res.status(200).json({
                success: true,
                message: "Login successful",
                data: { token },
            });
        }

        else {
            return res.status(401).json({
                success: false,
                message: 'Invalid password.',
            });
        }
    }

    catch (e) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: e.message,
        })
    }
}

const editProfile = (req, res) => {

}