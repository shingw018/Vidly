const express = require('express');
const router = express.Router();
const { homeGet } = require('../controllers/home.js');

router.get('/', homeGet);

module.exports = router;