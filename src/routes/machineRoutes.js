const express = require('express');
const { createMachine, getMachines, getMachineById, updateMachine, deleteMachine } = require('../controllers/machineController');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.post('/machines', verifyToken, createMachine);
router.get('/machines', verifyToken, getMachines);
router.get('/machines/:id', verifyToken, getMachineById);
router.put('/machines/:id', verifyToken, updateMachine);
router.delete('/machines/:id', verifyToken, deleteMachine);

module.exports = router;
