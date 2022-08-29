const _ = require('lodash');
const { Customer, validateCustomer } = require('../models/customer.js');

exports.getAllCustomers = async (req, res) => {
    //get All customers
    const customers = await Customer.find().sort('name');
    res.json(customers);   
}

exports.getACustomer = async (req, res) => {
    //getACustomer
    const customer = await Customer.findOne(_.pick(req.params, ['name', 'phone']));
    if(!customer) return res.status(404).send('Cannot find the customer.');
    res.json(customer);
}

exports.postCustomer = async (req, res) => {
    //validate input
    const { error, value } = validateCustomer(req.body);
    if(error !== undefined) return res.status(400).send(error.message);

    //check duplicate
    const checkCustomer = await Customer.findOne(value);
    if(checkCustomer) return res.status(400).send('Dulplicated customer.');

    //save the input
    const customer = new Customer(_.pick(value, ['name', 'isGold', 'phone']));
    await customer.save();

    //return the input
    res.json(customer);
}

exports.patchCustomer = async (req, res) => {
    //find the customer
    const customer = await Customer.findOne(_.pick(req.params, ['name', 'phone']));
    if(!customer) return res.status(404).send('Cannot find the customer.');

    //check duplicate
    const duplicateCustomer = await Customer.findOne(_.pick(req.body, ['name', 'isGold', 'phone']));
    if(duplicateCustomer) return res.status(400).send('Cannot update the customer due to deplicated record.');

    //update the customer
    const updatedCustomer = await Customer.findByIdAndUpdate(customer.id, { ...req.body }, { new: true });

    res.json(updatedCustomer);
}

exports.deleteCustomer = async (req, res) => {
    //find the customer
    const customer = await Customer.findOne(_.pick(req.params, ['name', 'phone']));
    if(!customer) return res.status(404).send('Cannot find the customer.');

    //delete the customer
    await Customer.deleteOne(customer);

    res.send(customer);
}