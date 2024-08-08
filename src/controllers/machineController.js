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
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}/machines`;

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
