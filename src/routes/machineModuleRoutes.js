const express = require('express');
const {
    createModule,
    getModules,
    getModulesByMachineId,
    getModuleById,
    updateModule,
    deleteModule
} = require('../controllers/machineModuleController');
const router = express.Router();
const verifyToken = require('../middleware/auth');

// Route untuk membuat modul mesin baru
router.post('/machine-modules', verifyToken, createModule);

// Route untuk mendapatkan semua modul mesin dengan pagination
router.get('/machine-modules', verifyToken, getModules);

// Route untuk mendapatkan semua modul mesin berdasarkan machineId dengan pagination
router.get('/machine-modules/machine/:machineId', verifyToken, getModulesByMachineId);

// Route untuk mendapatkan modul mesin berdasarkan ID
router.get('/machine-modules/:id', verifyToken, getModuleById);

// Route untuk memperbarui modul mesin berdasarkan ID
router.put('/machine-modules/:id', verifyToken, updateModule);

// Route untuk menghapus modul mesin berdasarkan ID
router.delete('/machine-modules/:id', verifyToken, deleteModule);

module.exports = router;
