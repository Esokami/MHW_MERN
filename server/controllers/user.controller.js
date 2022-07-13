const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.register = (req, res) => {
    const user = new User (req.body);

    user.save()
        .then((newUser) => {
            console.log(newUser);
            console.log("Successfully registered");
            res.json({
                successMessage: "Thank you for registering",
                user: newUser
            })
        })
        .catch((err) => {
            console.log("Register not successful")
            res.status(400).json(err)
        })
}

module.exports.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if (user === null) {
                res.status(400).json({message: "Invalid Login Attempt"})
            }
            else{
                bcrypt.compare(req.body.password, user.password)
                    .then((isPasswordValid) => {
                        if(isPasswordValid) {
                            console.log("Password is valid");
                            res.cookie(
                                "usertoken",
                                jwt.sign(
                                    {
                                        id: user._id,
                                        email: user.email,
                                        username: user.username
                                    },
                                    process.env.JWT_SECRET
                                ),
                                {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 9000000)
                                }
                            ).json({
                                message: "Successful",
                                userLoggedIn: user.username,
                            });
                        }
                        else{
                            res.status(400).json({message: "Invalid Attempt"})
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json({message: "Invalid Attempt"})
                    })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({message: "Invalid Attempt"})
        })
}

module.exports.logout = (req, res) => {
    console.log("User logged out")
    res.clearCookie('usertoken');
    res.sendStatus(200);
    res.json({
        message: "Successfully logged out"
    })
}

module.exports.getLoggedInUser = (req, res) => {

    User.findOne({_id: req.jwtpayload.id})
        .then((user) => {
            console.log(user);
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        })
}