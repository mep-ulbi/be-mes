const express = require('express');
const { startOperation, stopOperation, getOperations } = require('../controllers/productionOperationController');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.post('/operations/start', verifyToken, startOperation);
router.put('/operations/stop/:id', verifyToken, stopOperation);
router.get('/operations', verifyToken, getOperations);

module.exports = router;
