const { User, validateUser, validateUserUpdate } = require('../models/user.js');
const _ = require('lodash');
const bcryptjs = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
    //authenticate
    if(!req.user.isAdmin) return res.status(403).send('You are not admin. You are not allowed to get all the users.');
    //get the users
    const users = await User.find().sort('email').select('email name isAdmin');
    res.json(users);
}

exports.getAUser = async (req, res) => {
    //find the customer
    const user = await User.findOne(_.pick(req.params, ['email'])).select('email name isAdmin');
    if(!user) return res.status(404).send('Cannot find the user.');
    if((req.user.email !== user.email) && (!req.user.isAdmin)) return res.status(403).send('You are not allowed to get this user. Invalid token.');

    res.json(user);
}

exports.postUser = async (req, res) => {
    //validate user
    const { error, value } = validateUser(req.body);
    if(error !== undefined) return res.status(400).send(error.message);

    //check duplicate
    const duplicate = await User.findOne(_.pick(value, 'email'));  
    if(duplicate) return res.status(400).send('Duplicated user.');
    
    //save the user
    let user = new User(value);
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).json(user);
}

exports.patchUser = async (req, res) => {
    //find user
    const user = await User.findOne(_.pick(req.params, 'email'));
    if(!user) return res.status(404).send('Cannot find the user.');
    if((req.user.email !== user.email) && (!req.user.isAdmin)) return res.status(403).send('You cannot patch this user. Invalid token.');

    //validate input
    const { error, value } = validateUserUpdate(req.body);
    if(error !== undefined) return res.status(400).send(error.message);

    //check duplicate
    const duplicate = await User.findOne(_.pick(req.body, 'email'));
    if(duplicate) return res.status(400).send('Duplicate email which should be unique.');

    //patch the user
    const update = await User.updateOne(_.pick(user, 'email'), { ...value }, { new: true });
    res.send(update);
}

exports.deleteUser = async (req, res) => {
    //find the user
    const user = await User.findOne(_pick(req.params, 'email'));
    if(!user) return res.status(404).send('Cannot find the user.');
    if((req.user.email !== user.email) && (!req.user.isAdmin)) return res.status(403).send('You cannot delete this user. Invalid token.');
    await User.deleteOne({ email: user.email })
    res.send(user);
}