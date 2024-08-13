const express = require('express');
const { createProduction, getProductions, getProductionById, updateProduction, deleteProduction,getProductionStepsByProductionId
    ,getProductionStepByIdAndProductionId } = require('../controllers/productionController');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.post('/productions', verifyToken,createProduction);
router.get('/productions', verifyToken,getProductions);
router.get('/productions/:id',verifyToken, getProductionById);
router.put('/productions/:id', verifyToken,updateProduction);
router.delete('/productions/:id',verifyToken, deleteProduction);

router.get('/productions/steps/:productionId',verifyToken,getProductionStepsByProductionId);
router.get('/productions/:productionId/steps/:stepId',verifyToken ,getProductionStepByIdAndProductionId);

module.exports = router;

