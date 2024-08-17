const Machine = require('../models/machineModel');
const MachineStep = require('../models/machineStepModel');
const { sequelize } = require('../config/db');
const upload = require('../config/multerMachineConfig');
const fs = require('fs').promises;
const path = require('path');
const moment = require('moment');

const predefinedSteps = [
    { step_name: 'Internal Order / Review Order', department: 'PPC Warehouse', lead_time: null, description: '' },
    { step_name: 'Production Engineering (cek drawing, BOM, Routing)', department: 'Engineer Produksi', lead_time: null, description: '' },
    { step_name: 'Request Material', department: 'PPC Produksi', lead_time: null, description: '' },
    { step_name: 'Permintaan Pengeluaran Barang', department: 'PPC Warehouse', lead_time: null, description: '' },
    { step_name: 'Preparasi Material Gudang Berdasarkan Request', department: 'Warehouse', lead_time: null, description: '' },
    { step_name: 'Bukti Pengiriman Barang', department: 'PPC Warehouse', lead_time: null, description: '' },
    { step_name: 'Distribusi material ke Produksi', department: 'Warehouse', lead_time: null, description: '' },
    { step_name: 'Good Receipt', department: 'PPC & QC Produksi', lead_time: null, description: '' },
    { step_name: 'Input kedatangan Material', department: 'PPC Produksi', lead_time: null, description: '' },
    { step_name: 'Preparasi Komponen per MO & Distribusi material ke Work center', department: 'PPC Produksi', lead_time: null, description: '' },
    { step_name: 'Manufacturing Order', department: 'PPC Produksi', lead_time: null, description: '' },
    { step_name: 'Proses Pekerjaan', department: 'Produksi', lead_time: null, description: '' },
    { step_name: 'Quality Inspection', department: 'QC Produksi', lead_time: null, description: '' },
    { step_name: 'BPP pengeluaran barang dari Produksi ke Gudang', department: 'Produksi & Warehouse', lead_time: null, description: '' },
    { step_name: 'Packing', department: 'Warehouse', lead_time: null, description: '' }
];

// Create a new machine
exports.createMachine = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(400).json({ error: err });
            return;
        }

        const { kode_mesin, nama_mesin } = req.body;
        const filePath = req.file ? req.file.filename : null;
        const t = await sequelize.transaction();

        try {
            const createdBy = req.user.id;
            const machine = await Machine.create({
                kode_mesin,
                nama_mesin,
                filePath,
                createdBy
            }, { transaction: t });

            for (const step of predefinedSteps) {
                await MachineStep.create({
                    machineId: machine.id,
                    step_name: step.step_name,
                    department: step.department,
                    lead_time: step.lead_time,
                    description: step.description,
                    start_time: null,
                    end_time: null,
                    hold_time: null,
                    resume_time: null
                }, { transaction: t });
            }

            await t.commit();
            res.status(201).json({
                message: "Machine and steps created successfully",
                machineId: machine.id,
                filePath: req.file ? req.file.path : "No file uploaded"
            });
        } catch (err) {
            await t.rollback();
            res.status(500).json({ error: err.message });
        }
    });
};

// Get all machines with pagination
exports.getMachines = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Machine.findAndCountAll({
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads`;

        // Map over the rows and modify the filePath to include the full URL
        const machines = rows.map(machine => {
            return {
                ...machine.toJSON(),
                filePath: machine.filePath ? `${baseUrl}/${machine.filePath}` : null
            };
        });

        res.status(200).json({
            current_page: page,
            data: machines,
            first_page_url: `${req.protocol}://${req.get('host')}${req.baseUrl}?page=1`,
            from: offset + 1,
            last_page: totalPages,
            last_page_url: `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${totalPages}`,
            links: [
                {
                    url: page > 1 ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page - 1}` : null,
                    label: "&laquo; Previous",
                    active: false
                },
                ...Array.from({ length: totalPages }, (_, i) => ({
                    url: `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${i + 1}`,
                    label: `${i + 1}`,
                    active: i + 1 === page
                })),
                {
                    url: page < totalPages ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page + 1}` : null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            next_page_url: page < totalPages ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page + 1}` : null,
            path: `${req.protocol}://${req.get('host')}${req.baseUrl}`,
            per_page: limit,
            prev_page_url: page > 1 ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page - 1}` : null,
            to: offset + rows.length,
            total: count
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get machine by ID
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

// Update a machine
exports.updateMachine = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(400).json({ error: err });
            return;
        }

        const { id } = req.params;
        const { kode_mesin, nama_mesin } = req.body;

        try {
            const machine = await Machine.findByPk(id);
            if (machine) {
                machine.kode_mesin = kode_mesin;
                machine.nama_mesin = nama_mesin;

                if (req.file) {
                    machine.filePath = req.file.filename;
                }

                await machine.save();
                res.status(200).json({
                    message: "Machine updated successfully",
                    machine
                });
            } else {
                res.status(404).json({ error: 'Machine not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};
// Delete a machine
exports.deleteMachine = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the machine by ID
        const machine = await Machine.findByPk(id);
        if (machine) {
            // If the machine has an associated file, attempt to delete the file
            if (machine.filePath) {
                const filePath = path.join(__dirname, '..', 'uploads', machine.filePath);

                try {
                    await fs.access(filePath);
                    await fs.unlink(filePath);
                    console.log("File deleted:", machine.filePath);
                } catch (err) {
                    if (err.code === 'ENOENT') {
                        console.log("File not found, skipping deletion:", machine.filePath);
                    } else {
                        console.error("Error deleting file:", err);
                        return res.status(500).json({ error: 'Failed to delete associated file' });
                    }
                }
            }

            // Delete all associated machine steps
            await MachineStep.destroy({ where: { machineId: machine.id } });

            // Delete the machine itself
            await machine.destroy();

            res.status(200).json({ message: 'Machine and associated steps deleted successfully' });
        } else {
            res.status(404).json({ error: 'Machine not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getMachineStepByIdAndMachineId = async (req, res) => {
    const { machineId, stepId: id } = req.params;

    try {
        console.log(`Received machineId: ${machineId}, id: ${id}`);

        const numericMachineId = parseInt(machineId, 10);
        const numericId = parseInt(id, 10);

        console.log(`Parsed machineId: ${numericMachineId}, Parsed id: ${numericId}`);

        if (isNaN(numericMachineId) || numericMachineId <= 0 || isNaN(numericId) || numericId <= 0) {
            console.log('Invalid machine ID or step ID detected.');
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid machine ID or step ID. Both must be positive numbers.',
                data: []
            });
        }

        // Fetch the machine step along with its associated machine data
        const step = await MachineStep.findOne({
            where: {
                machineId: numericMachineId,
                id: numericId
            },
            include: {
                model: Machine,
                as: 'machine',
                attributes: ['kode_mesin', 'nama_mesin']
            }
        });

        if (!step) {
            console.log('Machine step not found.');
            return res.status(404).json({
                statusCode: 404,
                message: `No machine step found for machine ID ${numericMachineId} with step ID ${numericId}.`,
                data: []
            });
        }

        // Structure the response with the necessary data
        const responseData = {
            kode_mesin: step.machine.kode_mesin,
            nama_mesin: step.machine.nama_mesin,
            id: step.id,
            step_name: step.step_name,
            department: step.department,
            lead_time: step.lead_time,
            description: step.description,
            start_time: step.start_time,
            end_time: step.end_time,
            hold_time: step.hold_time,
            resume_time: step.resume_time,
            machineId: step.machineId,
        };

        res.status(200).json({
            statusCode: 200,
            message: 'Machine step retrieved successfully.',
            data: responseData
        });
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({
            statusCode: 500,
            message: 'An error occurred while retrieving the machine step.',
            data: [],
            error: err.message
        });
    }
};

// Get machine steps by machine ID
exports.getMachineStepsByMachineId = async (req, res) => {
    const { machineId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const numericMachineId = Number(machineId);
        if (isNaN(numericMachineId) || numericMachineId <= 0) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid machine ID. It must be a positive number.',
                data: []
            });
        }

        const { count, rows } = await MachineStep.findAndCountAll({
            where: { machineId: numericMachineId },
            limit,
            offset
        });

        if (count === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: `No machine steps found for machine ID ${numericMachineId}.`,
                data: []
            });
        }

        const totalPages = Math.ceil(count / limit);
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

        res.status(200).json({
            statusCode: 200,
            message: 'Machine steps retrieved successfully.',
            current_page: page,
            data: rows,
            first_page_url: `${baseUrl}?page=1`,
            from: offset + 1,
            last_page: totalPages,
            last_page_url: `${baseUrl}?page=${totalPages}`,
            links: [
                {
                    url: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
                    label: "&laquo; Previous",
                    active: false
                },
                ...Array.from({ length: totalPages }, (_, i) => ({
                    url: `${baseUrl}?page=${i + 1}`,
                    label: `${i + 1}`,
                    active: i + 1 === page
                })),
                {
                    url: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            next_page_url: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
            path: baseUrl,
            per_page: limit,
            prev_page_url: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
            to: offset + rows.length,
            total: count
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            message: 'An error occurred while retrieving machine steps.',
            data: [],
            error: err.message
        });
    }
};

// Calculate total lead time for machine steps
exports.calculateTotalLeadTime = async (req, res) => {
    const { machineId } = req.params;

    try {
        const steps = await MachineStep.findAll({
            where: { machineId },
            attributes: ['lead_time', 'step_name'],
            order: [['id', 'ASC']]
        });

        if (!steps || steps.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: `No machine steps found for machine ID ${machineId}.`,
                data: []
            });
        }

        const totalLeadTimeSoFar = steps.reduce((sum, step) => sum + (step.lead_time ? parseFloat(step.lead_time) : 0), 0);

        const uncompletedSteps = steps.filter(step => step.lead_time === null);
        if (uncompletedSteps.length > 0) {
            const uncompletedStepNames = uncompletedSteps.map(step => step.step_name).join(', ');
            return res.status(200).json({
                statusCode: 200,
                message: `Some steps have not been completed: ${uncompletedStepNames}`,
                data: {
                    totalLeadTime: totalLeadTimeSoFar.toFixed(2) + ' Hari',
                    uncompletedSteps: uncompletedSteps.map(step => ({
                        step_name: step.step_name,
                        lead_time: step.lead_time
                    }))
                }
            });
        }

        const totalLeadTime = steps.reduce((sum, step) => sum + parseFloat(step.lead_time), 0);

        res.status(200).json({
            statusCode: 200,
            message: 'Total lead time calculated successfully.',
            data: { totalLeadTime: totalLeadTime.toFixed(2) + ' Hari' }
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            message: 'An error occurred while calculating the total lead time.',
            data: [],
            error: err.message
        });
    }
};

// Start a machine step
exports.startStep = async (req, res) => {
    const { machineId, stepId } = req.params;
    try {
        const numericMachineId = parseInt(machineId, 10);
        const numericStepId = parseInt(stepId, 10);

        if (isNaN(numericMachineId) || isNaN(numericStepId)) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid machine ID or step ID. Both must be numbers.',
                data: []
            });
        }

        const step = await MachineStep.findOne({ where: { id: numericStepId, machineId: numericMachineId } });
        if (!step) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Machine step not found.',
                data: []
            });
        }

        if (step.start_time) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Step already started.',
                data: []
            });
        }

        step.start_time = new Date();
        await step.save();

        res.status(200).json({
            statusCode: 200,
            message: 'Machine step started.',
            data: step
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            message: 'An error occurred while starting the step.',
            data: [],
            error: err.message
        });
    }
};

// Hold a machine step
exports.holdStep = async (req, res) => {
    const { machineId, stepId } = req.params;
    try {
        const step = await MachineStep.findOne({ where: { id: stepId, machineId } });
        if (!step) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Machine step not found.',
                data: []
            });
        }

        if (!step.start_time || step.end_time) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Step is not in progress or already completed.',
                data: []
            });
        }

        step.hold_time = new Date();
        await step.save();

        res.status(200).json({
            statusCode: 200,
            message: 'Machine step held.',
            data: step
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            message: 'An error occurred while holding the step.',
            data: [],
            error: err.message
        });
    }
};

// Continue a machine step
exports.continueStep = async (req, res) => {
    const { machineId, stepId } = req.params;
    try {
        const step = await MachineStep.findOne({ where: { id: stepId, machineId } });
        if (!step) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Machine step not found.',
                data: []
            });
        }

        if (!step.hold_time) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Step is not on hold.',
                data: []
            });
        }

        step.resume_time = new Date();
        await step.save();

        res.status(200).json({
            statusCode: 200,
            message: 'Machine step resumed.',
            data: step
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            message: 'An error occurred while resuming the step.',
            data: [],
            error: err.message
        });
    }
};

// End a machine step
exports.endStep = async (req, res) => {
    const { machineId, stepId } = req.params;
    try {
        const step = await MachineStep.findOne({ where: { id: stepId, machineId } });
        if (!step) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Machine step not found.',
                data: []
            });
        }

        if (step.end_time) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Step already ended.',
                data: []
            });
        }

        step.end_time = new Date();

        let leadTime = moment(step.end_time).diff(moment(step.start_time), 'hours', true);

        if (step.hold_time && step.resume_time) {
            leadTime -= moment(step.resume_time).diff(moment(step.hold_time), 'hours', true);
        }

        step.lead_time = leadTime.toFixed(2);
        await step.save();

        res.status(200).json({
            statusCode: 200,
            message: 'Machine step ended and lead time calculated.',
            data: step
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            message: 'An error occurred while ending the step.',
            data: [],
            error: err.message
        });
    }
};

// Get all productions created by a specific user
exports.getMachinesByUser = async (req, res) => {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Machine.findAndCountAll({
            where: { createdBy: userId },
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

        res.status(200).json({
            current_page: page,
            data: rows,
            first_page_url: `${baseUrl}?page=1`,
            from: offset + 1,
            last_page: totalPages,
            last_page_url: `${baseUrl}?page=${totalPages}`,
            links: [
                {
                    url: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
                    label: "&laquo; Previous",
                    active: false
                },
                ...Array.from({ length: totalPages }, (_, i) => ({
                    url: `${baseUrl}?page=${i + 1}`,
                    label: `${i + 1}`,
                    active: i + 1 === page
                })),
                {
                    url: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
                    label: "Next &raquo;",
                    active: false
                }
            ],
            next_page_url: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
            path: baseUrl,
            per_page: limit,
            prev_page_url: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
            to: offset + rows.length,
            total: count
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


