require("dotenv").config();

const express = require("express");
const app = express();
const winston = require("winston");

//loading startup modules
require("./startup/logging.js")();
require("./startup/error.js");
require("./startup/routes.js")(express, app);
require("./startup/db.js")();
require("./startup/config.js")();
require("./startup/validation.js")();
require("./startup/prod.js")(app);

//server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`${new Date(Date.now())} Listening on port ${port}`));

module.exports = server;
