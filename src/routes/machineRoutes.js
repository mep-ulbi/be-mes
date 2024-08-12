const express = require('express');
const { 
    createMachine, 
    getMachines, 
    getMachineById, 
    updateMachine, 
    deleteMachine, 
    getMachineStepsByMachineId,
    getMachineStepByIdAndMachineId,
    startStep,
    holdStep,
    continueStep,
    endStep,
    calculateTotalLeadTime 
} = require('../controllers/machineController');
const router = express.Router();
const verifyToken = require('../middleware/auth');

// Machine Routes
router.post('/machines', verifyToken, createMachine);
router.get('/machines', verifyToken, getMachines);
router.get('/machines/:id', verifyToken, getMachineById);
router.put('/machines/:id', verifyToken, updateMachine);
router.delete('/machines/:id', verifyToken, deleteMachine);

// Machine Steps Routes
router.get('/machines/steps/:machineId', verifyToken, getMachineStepsByMachineId);
router.get('/machines/:machineId/steps/:stepId', verifyToken, getMachineStepByIdAndMachineId);

// Start, Hold, Continue, End Machine Steps
router.put('/machines/:machineId/steps/:stepId/start', verifyToken, startStep);
router.put('/machines/:machineId/steps/:stepId/hold', verifyToken, holdStep);
router.put('/machines/:machineId/steps/:stepId/continue', verifyToken, continueStep);
router.put('/machines/:machineId/steps/:stepId/end', verifyToken, endStep);

// Calculate Total Lead Time
router.get('/machines/:machineId/total-lead-time', verifyToken, calculateTotalLeadTime);

module.exports = router;
