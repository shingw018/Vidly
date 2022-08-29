const express = require('express');
const router = express.Router();
const { getAllUsers, getAUser, postUser, patchUser, deleteUser } = require('../controllers/users.js');
const auth = require('../middleware/auth.js');

router.get('/', auth, getAllUsers);
router.get('/:email', auth, getAUser);
router.post('/', postUser);
router.patch('/:email', auth, patchUser);
router.delete('/:email', auth, deleteUser);

module.exports = router;