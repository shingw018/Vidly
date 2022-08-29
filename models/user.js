const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, email: this.email, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser (user) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(1024),
        isAdmin: Joi.boolean().default(false)
    });

    return schema.validate(user);
}

function validateUserUpdate (input) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50),
        email: Joi.string().min(5).max(255).email(),
        password: Joi.string().min(5).max(1024),
        isAdmin: Joi.boolean().default(false)
    });

    return schema.validate(input);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateUserUpdate = validateUserUpdate;