// productionOperationRoutes.js
const express = require('express');
const router = express.Router();
const {
  startOperation,
  holdOperation,
  resumeOperation,
  endOperation
} = require('../controllers/productionOperationController');
const verifyToken = require('../middleware/auth');


router.post('/start', verifyToken,startOperation);
router.patch('/:id/hold', verifyToken,holdOperation);
router.patch('/:id/resume', verifyToken,resumeOperation);
router.patch('/:id/end', verifyToken,endOperation);

module.exports = router;
