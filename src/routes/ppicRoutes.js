const express = require('express');
const { getAllProductions } = require('../controllers/ppicController');

const verifyToken = require('../middleware/auth');
const router = express.Router();


router.get('/productions-summary',verifyToken, getAllProductions);
module.exports = router;
