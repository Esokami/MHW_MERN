const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.register = (req, res) => {
    User.create(req.body)
        .then((user) => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);

            res 
                .cookie("usertoken", userToken, secret, {
                    httpOnly: true
                })
                .json({msg: "success!", user: user});
        })
        .catch((err) => {
            res.json(err);
        })
}

module.exports.login = async(req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (user === null){
        return res.sendStatus(400);
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword){
        return res.sendStatus(400);
    }

    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    res
        .cookie("usertoken", userToken, secret, {
            httpOnly: true
        })
        .json({msg: "success!"});
}

module.exports.logout = (req, res) => {
    res.clearkCookie('usertoken');
    res.sendStatus(200);
}

module.exports.getLoggedInUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.userToken, {
        complete: true
    })

    User.findOne({_id: decodedJWT.payload.id})
        .then((user) => {
            console.log(user);
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
        })
}