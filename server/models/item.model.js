const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"]
    },
    objectType: {
        type: String,
        required: [true, "Object type is required"],
        minlength: [3, "Object type must be at least 3 characters"]
    },
    monster: {
        type: String,
        required: [true, "Monster is required"],
        minlength: [3, "Monster must be at least 3 characters"]
    },
    materialName: {
        type: String
    },
    quantityOwned: {
        type: Number
    },
    quantityNeeded: {
        type: Number
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

module.exports = mongoose.model('Item', ItemSchema);