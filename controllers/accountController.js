const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        const createdUser = await User.create(user);
        const token = jwt.sign({email: createdUser.email, id: createdUser._id}, process.env.JWT_KEY);
        res.status(201).json({message: "User Registered", user: createdUser, token});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "User Registration Failed"});
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user) {
            const isValid = await bcrypt.compare(req.body.password, user.password);
            if(isValid) {
                const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_KEY);
                res.status(200).json({message: "Login Successful", token});
            } else {
                res.status(401).json({message: "Authentication Failed"});
            }
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Authentication Failed"});
    }
}