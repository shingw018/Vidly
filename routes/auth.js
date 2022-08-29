const express = require('express');
const router = express.Router();
const { postAuth } = require('../controllers/auth.js');

router.post('/', postAuth);


module.exports = router;