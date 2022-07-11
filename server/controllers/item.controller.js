const Item = require('../models/item.model');
const jwt = require("jsonwebtoken");

module.exports.createItem = (req, res) => {

    const newItemObj = new Item(req.body);
    const decodedJWT = jwt.decode(req.cookies.userToken, {
        complete: true
    })

    newItemObj.createdBy = decodedJWT.payload.id;

    newItemObj.save()
        .then((newItem) => {
            res.json(newItem);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

module.exports.getAllItems = (req, res) => {
    Item.find({})
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