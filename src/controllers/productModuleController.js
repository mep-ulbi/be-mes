const ProductModule = require('../models/productModule');
const ProcessDetail = require('../models/ProcessDetail');
const { sequelize } = require('../config/db');

exports.createModule = async (req, res) => {
    const { productionId, nama_modul } = req.body;
    const t = await sequelize.transaction();
    if (!productionId) {
        return res.status(400).json({ error: 'productionId is required' });
    }
    try {
        const module = await ProductModule.create({
            productionId,
            nama_modul
        }, { transaction: t });

        await t.commit();
        res.status(201).json({
            message: "Module created successfully",
            moduleId: module.id
        });
    } catch (err) {
        await t.rollback();
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(404).json({ error: 'Maaf data produksi tidak ditemukan' });
        }
        res.status(500).json({ error: err.message });
    }
};

exports.getModules = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await ProductModule.findAndCountAll({
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

exports.getModuleById = async (req, res) => {
    const { id } = req.params;
    try {
        const module = await ProductModule.findByPk(id, { include: ['details'] });
        if (module) {
            res.status(200).json(module);
        } else {
            res.status(404).json({ error: 'Module not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateModule = async (req, res) => {
    const { id } = req.params;
    const { nama_modul } = req.body;

    try {
        const module = await ProductModule.findByPk(id);
        if (module) {
            module.nama_modul = nama_modul;
            await module.save();
            res.status(200).json({
                message: "Module updated successfully",
                module
            });
        } else {
            res.status(404).json({ error: 'Module not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteModule = async (req, res) => {
    const { id } = req.params;
    try {
        const module = await ProductModule.findByPk(id);
        if (module) {
            await module.destroy();
            res.status(200).json({ message: 'Module deleted' });
        } else {
            res.status(404).json({ error: 'Module not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
