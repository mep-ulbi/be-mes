const MachineStep = require('../models/machineStepModel');
const { sequelize } = require('../config/db');
const MachineModule = require('../models/machineModule');

exports.createMachineDetail = async (req, res) => {
    const { module_id, nama_proses, waktu_m, output_per_unit, jumlah_kebutuhan_per_unit, process_type, utilisasi_mesin } = req.body;
    const t = await sequelize.transaction();

    try {
        const waktu_m_per_unit = (waktu_m / output_per_unit) * jumlah_kebutuhan_per_unit;

        const detail = await MachineStep.create({
            module_id,
            nama_proses,
            waktu_m,
            output_per_unit,
            jumlah_kebutuhan_per_unit,
            process_type,
            utilisasi_mesin,
            waktu_m_per_unit
        }, { transaction: t });

        await t.commit();
        res.status(201).json({
            message: "Machine step created successfully",
            detailId: detail.id
        });
    } catch (err) {
        await t.rollback();
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(404).json({ error: 'Machine module not found, cannot add machine step' });
        }
        res.status(500).json({ error: err.message });
    }
};

exports.getDetailsByModuleId = async (req, res) => {
    const { module_id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await MachineStep.findAndCountAll({
            where: { module_id },
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            current_page: page,
            data: rows,
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

exports.getDetailById = async (req, res) => {
    const { id } = req.params;
    try {
        const detail = await MachineStep.findByPk(id);
        if (detail) {
            res.status(200).json(detail);
        } else {
            res.status(404).json({ error: 'Machine step not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateMachineDetail = async (req, res) => {
    const { id } = req.params;
    const { nama_proses, waktu_m, output_per_unit, jumlah_kebutuhan_per_unit } = req.body;

    try {
        const detail = await MachineStep.findByPk(id);
        if (detail) {
            detail.nama_proses = nama_proses;
            detail.waktu_m = waktu_m;
            detail.output_per_unit = output_per_unit;
            detail.jumlah_kebutuhan_per_unit = jumlah_kebutuhan_per_unit;
            await detail.save();
            res.status(200).json({
                message: "Machine step updated successfully",
                detail
            });
        } else {
            res.status(404).json({ error: 'Machine step not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMachineDetail = async (req, res) => {
    const { id } = req.params;

    try {
        const detail = await MachineStep.findByPk(id);

        if (!detail) {
            return res.status(404).json({ error: 'Machine step not found' });
        }

        await detail.destroy();
        res.status(200).json({ message: 'Machine step deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while trying to delete the machine step' });
    }
};

exports.getSumByProcessTypeAndMachineId = async (req, res) => {
    const { process_type, machineId } = req.params;

    try {
        // Log the inputs
        console.log(`Process Type: ${process_type}, Machine ID: ${machineId}`);

        // Find all modules associated with the given machineId
        const modules = await MachineModule.findAll({
            where: { machineId },
            attributes: ['id']
        });

        // Log the modules found
        console.log('Modules found:', modules);

        if (!modules || modules.length === 0) {
            return res.status(404).json({ error: 'No modules found for the specified machine ID' });
        }

        const moduleIds = modules.map(module => module.id);
        const totalSum = await MachineStep.sum('waktu_m_per_unit', {
            where: {
                process_type,
                module_id: moduleIds
            }
        });

        if (totalSum === null || totalSum === 0) {
            return res.status(404).json({ error: 'No details found for the specified process type within the given machine ID' });
        }

        const totalInHours = Math.ceil((totalSum / 60) * 100) / 100;

        res.status(200).json({
            message: `Total sum of waktu_m_per_unit for process type ${process_type} within machine ID ${machineId} is ${totalInHours} hours`,
            totalInHours
        });
    } catch (err) {
        console.error('Error:', err);  // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while calculating the total sum' });
    }
};
