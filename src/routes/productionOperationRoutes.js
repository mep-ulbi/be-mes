// productionOperationRoutes.js
const express = require('express');
const router = express.Router();
const {

    startStep,
    holdStep,
    continueStep,
    endStep,
    calculateTotalLeadTime
} = require('../controllers/productionController');
const verifyToken = require('../middleware/auth');

router.put('/productions/:productionId/steps/:stepId/start', verifyToken, startStep);
router.put('/productions/:productionId/steps/:stepId/hold', verifyToken, holdStep);
router.put('/productions/:productionId/steps/:stepId/continue', verifyToken, continueStep);
router.put('/productions/:productionId/steps/:stepId/end', verifyToken, endStep);
router.get('/productions/:productionId/total-lead-time', verifyToken, calculateTotalLeadTime);



module.exports = router;
