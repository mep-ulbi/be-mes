const express = require('express');
const {
    createMachineDetail,
    getDetailsByModuleId,
    getDetailById,
    updateMachineDetail,
    deleteMachineDetail,
    getSumByProcessTypeAndMachineId
} = require('../controllers/prosesDetailMachineController');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.post('/machine-details', verifyToken, createMachineDetail);
router.get('/machine-details/:module_id', verifyToken, getDetailsByModuleId);
router.get('/machine-details/detail/:id', verifyToken, getDetailById);
router.put('/machine-details/detail/:id', verifyToken, updateMachineDetail);
router.delete('/machine-details/detail/:id', verifyToken, deleteMachineDetail);
router.get('/machines/:machineId/sum/:process_type', verifyToken, getSumByProcessTypeAndMachineId);

module.exports = router;
