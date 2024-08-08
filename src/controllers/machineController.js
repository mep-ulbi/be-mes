const Machine = require('../models/machineModel');

// Create new machine
exports.createMachine = async (req, res) => {
    const { kode_mesin, nama_mesin } = req.body;
    try {
        const machine = await Machine.create({ kode_mesin, nama_mesin });
        res.status(201).json(machine);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all machines
exports.getMachines = async (req, res) => {
    try {
        const machines = await Machine.findAll();
        res.status(200).json(machines);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get machine by id
exports.getMachineById = async (req, res) => {
    const { id } = req.params;
    try {
        const machine = await Machine.findByPk(id);
        if (machine) {
            res.status(200).json(machine);
        } else {
            res.status(404).json({ error: 'Machine not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update machine
exports.updateMachine = async (req, res) => {
    const { id } = req.params;
    const { kode_mesin, nama_mesin } = req.body;
    try {
        const machine = await Machine.findByPk(id);
        if (machine) {
            machine.kode_mesin = kode_mesin;
            machine.nama_mesin = nama_mesin;
            await machine.save();
            res.status(200).json(machine);
        } else {
            res.status(404).json({ error: 'Machine not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete machine
exports.deleteMachine = async (req, res) => {
    const { id } = req.params;
    try {
        const machine = await Machine.findByPk(id);
        if (machine) {
            await machine.destroy();
            res.status(200).json({ message: 'Machine deleted' });
        } else {
            res.status(404).json({ error: 'Machine not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
