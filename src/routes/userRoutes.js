const express = require('express');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();
const verifyToken = require('../middleware/auth');


router.post('/users', verifyToken,createUser);
router.get('/users',verifyToken, getUsers);
router.put('/users/:id',verifyToken, updateUser);
router.delete('/users/:id', verifyToken,deleteUser);

module.exports = router;
