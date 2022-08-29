const { User } = require('../models/user.js');
const Joi = require("joi");
const _ = require('lodash');
const bcryptjs = require('bcryptjs');

exports.postAuth = async (req, res) => {
    //validate input
    const { error, value } = validateAuth(req.body);
    if(error !== undefined) return res.send(error.message);

    //find the user
    const user = await User.findOne(_.pick(value, 'email'));
    if(!user) return res.send('Invalid email or password.');

    //validate password
    const validPassword = await bcryptjs.compare(value.password, user.password);
    if(!validPassword) return res.send('Invalid email or password.');

    //return token
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
}

function validateAuth (input) {
    const schema = Joi.object({
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().min(5).max(1024).required()
    });

    return schema.validate(input);
}