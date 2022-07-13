const Item = require('../models/item.model');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");

module.exports.createItem = (req, res) => {

    const newItemObj = new Item(req.body);
    const decodedJWT = jwt.decode(req.cookies.usertoken, {
        complete: true
    })

    newItemObj.createdBy = decodedJWT.payload.id;

    newItemObj.save()
        .then((newItem) => {
            res.json(newItem);
        })
        .catch((err) => {
            console.log("Something went wrong when trying to create an item")
            res.status(400).json(err);
        });
}

module.exports.getAllItems = (req, res) => {
    Item.find({})
        .populate("createdBy", "username email")
        .then((allItems) => {
            console.log(allItems);
            res.json(allItems);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
}

module.exports.getOneItem = (req, res) => {
    Item.findOne({ _id: req.params.id})
        .then( (oneItem) => {
            res.json(oneItem);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
}

module.exports.updateItem = (req, res) => {
    Item.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true
    })
        .then((updatedItem) => {
            res.json(updatedItem);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
}

module.exports.deleteItem = (req, res) => {
    Item.deleteOne({_id: req.params.id})
        .then((deleteConfirmation) => {
            res.json(deleteConfirmation);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
}

module.exports.findAllItemsByUser = (req, res) => {
    if(req.jwtpayload.username !== req.params.username){
        console.log("Not the user");

        User.findOne({username: req.params.username})
            .then((userNotLoggedIn) => {
                Item.find({createdBy: userNotLoggedIn.id})
                    .populate("createdBy", "username")
                    .then((allItemsFromUser) => {
                        console.log("All items from user");
                        res.json(allItemsFromUser)
                    })
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json(err);
            })
    }
    else {
        console.log("Current user")
        console.log("req.jwtpayload.id:", req.jwtpayload.id);
        Item.find({createdBy: req.jwtpayload.id})
            .populate("createdBy", "username")
            .then((allItemsFromLoggedInUser) => {
                console.log(allItemsFromLoggedInUser);
                res.json(allItemsFromLoggedInUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    }
}