const express = require('express');
const {
    createDetail,
    getDetailsByModuleId,
    getDetailById,
    updateDetail,
    deleteDetail,
    getSumByProcessTypeAndProductionId
} = require('../controllers/processDetailController');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.post('/details', verifyToken, createDetail);
router.get('/details/:module_id', verifyToken, getDetailsByModuleId);
router.get('/details/detail/:id', verifyToken, getDetailById);
router.put('/details/detail/:id', verifyToken, updateDetail);
router.delete('/details/detail/:id', verifyToken, deleteDetail);
router.get('/productions/:productionId/sum/:process_type', verifyToken, getSumByProcessTypeAndProductionId);

module.exports = router;
