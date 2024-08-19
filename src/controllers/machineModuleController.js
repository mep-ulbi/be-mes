const MachineModule = require('../models/machineModule');
const MachineStep = require('../models/machineStepModel');
const { sequelize } = require('../config/db');
const MachineDetail = require('../models/machineDetail');

exports.createModule = async (req, res) => {
    const { machineId, nama_modul, faktor_x } = req.body;
    const t = await sequelize.transaction();
    if (!machineId) {
        return res.status(400).json({ error: 'machineId is required' });
    }
    try {
        const module = await MachineModule.create({
            machineId,
            nama_modul,
            faktor_x,
        }, { transaction: t });

        await t.commit();
        res.status(201).json({
            message: "Machine module created successfully",
            moduleId: module.id
        });
    } catch (err) {
        await t.rollback();
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(404).json({ error: 'Machine not found, unable to create module' });
        }
        res.status(500).json({ error: err.message });
    }
};

exports.getModules = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await MachineModule.findAndCountAll({
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

exports.getModulesByMachineId = async (req, res) => {
    const { machineId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await MachineModule.findAndCountAll({
            where: { machineId },
            limit,
            offset
        });

        if (count === 0) {
            return res.status(404).json({ error: `No modules found for machine ID ${machineId}` });
        }

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

exports.getModuleById = async (req, res) => {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    try {
        const module = await MachineModule.findByPk(id, {
            include: [{
                model: MachineDetail, 
                as: 'details',
                limit,
                offset
            }]
        });

        if (module) {
            const stepsCount = await MachineDetail.count({ where: { module_id: id } });
            const totalPages = Math.ceil(stepsCount / limit);
            const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;

            res.status(200).json({
                module,
                detail_pagination: {
                    current_page: page,
                    per_page: limit,
                    total: stepsCount,
                    total_pages: totalPages,
                    from: offset + 1,
                    to: offset + module.details.length,
                    first_page_url: `${baseUrl}?page=1&limit=${limit}`,
                    last_page_url: `${baseUrl}?page=${totalPages}&limit=${limit}`,
                    prev_page_url: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
                    next_page_url: page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,
                }
            });
        } else {
            res.status(404).json({ error: 'Machine module not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateModule = async (req, res) => {
    const { id } = req.params;
    const { nama_modul } = req.body;

    try {
        const module = await MachineModule.findByPk(id);
        if (module) {
            module.nama_modul = nama_modul;
            await module.save();
            res.status(200).json({
                message: "Machine module updated successfully",
                module
            });
        } else {
            res.status(404).json({ error: 'Machine module not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteModule = async (req, res) => {
    const { id } = req.params;
    try {
        const module = await MachineModule.findByPk(id);
        if (module) {
            await module.destroy();
            res.status(200).json({ message: 'Machine module deleted' });
        } else {
            res.status(404).json({ error: 'Machine module not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
