const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    }
}, {timestamps: true});

UserSchema.path('email').validate(async (value) => {
    const emailCount = await mongoose.models.User.countDocuments({email: value});
    return !emailCount;
}, 'Email is already taken');

UserSchema.virtual('confirmPassword')
    .get(()=> this._confirmPassword)
    .set((value) => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match');
        console.log("Passwords don't match")
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
})


module.exports = mongoose.model('User', UserSchema);