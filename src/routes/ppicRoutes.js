const express = require('express');
const { getAllProductions, getAllMachines } = require('../controllers/ppicController');

const verifyToken = require('../middleware/auth');
const router = express.Router();


router.get('/productions-summary', getAllProductions);
router.get('/machine-summary', getAllMachines);
module.exports = router;
