const Production = require('../models/productionModel');

// Create new production
exports.createProduction = async (req, res) => {
    const { kode_produk, nama_produk, tahapan_proses, nama_proses_modul, detail_proses } = req.body;
    try {
        const production = await Production.create({ kode_produk, nama_produk, tahapan_proses, nama_proses_modul, detail_proses });
        res.status(201).json(production);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all productions
exports.getProductions = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Production.findAndCountAll({
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}/productions`;

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
// Get production by id
exports.getProductionById = async (req, res) => {
    const { id } = req.params;
    try {
        const production = await Production.findByPk(id);
        if (production) {
            res.status(200).json(production);
        } else {
            res.status(404).json({ error: 'Production not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update production
exports.updateProduction = async (req, res) => {
    const { id } = req.params;
    const { kode_produk, nama_produk, tahapan_proses, nama_proses_modul, detail_proses } = req.body;
    try {
        const production = await Production.findByPk(id);
        if (production) {
            production.kode_produk = kode_produk;
            production.nama_produk = nama_produk;
            production.tahapan_proses = tahapan_proses;
            production.nama_proses_modul = nama_proses_modul;
            production.detail_proses = detail_proses;
            await production.save();
            res.status(200).json(production);
        } else {
            res.status(404).json({ error: 'Production not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete production
exports.deleteProduction = async (req, res) => {
    const { id } = req.params;
    try {
        const production = await Production.findByPk(id);
        if (production) {
            await production.destroy();
            res.status(200).json({ message: 'Production deleted' });
        } else {
            res.status(404).json({ error: 'Production not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
