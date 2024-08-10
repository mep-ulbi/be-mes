const ProductionOperation = require('../models/productionOperationModel');
const { Op } = require('sequelize');

// Memulai operasi produksi
exports.startOperation = async (req, res) => {
    const { production_id, machine_id, operator_name } = req.body;

    try {
        const operation = await ProductionOperation.create({
            production_id,
            machine_id,
            operator_name,
            start_time: new Date(),
            end_time: null,
            duration: null
        });

        res.status(201).json(operation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menghentikan operasi produksi dan menghitung durasi
exports.stopOperation = async (req, res) => {
    const { id } = req.params;

    try {
        const operation = await ProductionOperation.findByPk(id);
        if (!operation) {
            return res.status(404).json({ error: 'Operation not found' });
        }

        const endTime = new Date();
        const duration = Math.floor((endTime - new Date(operation.start_time)) / 1000); // Durasi dalam detik

        operation.end_time = endTime;
        operation.duration = duration;
        await operation.save();

        res.status(200).json(operation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mendapatkan daftar operasi produksi dengan paginasi
exports.getOperations = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await ProductionOperation.findAndCountAll({
            limit,
            offset,
            include: ['Production', 'Machine']
        });

        const totalPages = Math.ceil(count / limit);
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}/operations`;

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
