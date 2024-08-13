const express = require('express');
const {
    createModule,
    getModules,
    getModuleById,
    updateModule,
    deleteModule
} = require('../controllers/productModuleController');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.post('/modules', verifyToken, createModule);
router.get('/modules', verifyToken, getModules);
router.get('/modules/:id', verifyToken, getModuleById);
router.put('/modules/:id', verifyToken, updateModule);
router.delete('/modules/:id', verifyToken, deleteModule);

module.exports = router;
