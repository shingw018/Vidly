const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function () {
    mongoose.connect(`mongodb+srv://${config.get('MongoDB.username')}:${config.get('MongoDB.password')}@cluster0.zqo45.mongodb.net/${config.get('MongoDB.database')}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => winston.info(`${new Date(Date.now())} Connected to MongoDB dbname`));
}
