const ProcessDetail = require('../models/ProcessDetail');
const { sequelize } = require('../config/db');
const ProductModule = require('../models/productModule');
const ProductionStep = require('../models/productionStepModel')

exports.createDetail = async (req, res) => {
    const { module_id, nama_proses, waktu_m, output_per_unit, jumlah_kebutuhan_per_unit, process_type, utilisasi_mesin, productionId } = req.body;
    const t = await sequelize.transaction();

    try {
        console.log("Received data:", req.body);

        // Membuat detail proses baru
        const waktu_m_per_unit = (waktu_m / output_per_unit) * jumlah_kebutuhan_per_unit;
        const createdDetail = await ProcessDetail.create({
            module_id,
            nama_proses,
            waktu_m,
            output_per_unit,
            jumlah_kebutuhan_per_unit,
            process_type,
            utilisasi_mesin,
            waktu_m_per_unit
        }, { transaction: t });

        console.log("ProcessDetail created with ID:", createdDetail.id);

        // Menghitung total waktu_m_per_unit untuk semua detail dengan module_id dan productionId yang sama
        const totalWaktu = await ProcessDetail.sum('waktu_m_per_unit', {
            include: [{
                model: ProductModule,
                as: 'module',
                where: { id: module_id, productionId },
                required: true
            }],
            transaction: t
        });

        console.log("Total waktu_m_per_unit:", totalWaktu);

        // Menghitung lead_time baru
        const newLeadTime = ((totalWaktu / 60) / 7)* 10;;
        console.log("Calculated new lead time:", newLeadTime);

        // Mencari dan memperbarui ProductionStep yang sesuai
        const productionStep = await ProductionStep.findOne({
            where: { productionId, step_name: 'Proses Pekerjaan' },
            transaction: t
        });

        if (!productionStep) {
            await t.rollback();
            console.log("ProductionStep not found");
            return res.status(404).json({ error: 'Production step tidak ditemukan.' });
        }

        productionStep.lead_time = newLeadTime;
        await productionStep.save({ transaction: t });
        console.log("ProductionStep lead_time updated to:", newLeadTime);

        await t.commit();
        res.status(201).json({
            message: "Process detail created and lead time updated successfully",
            detailId: productionStep.id,
            newLeadTime: newLeadTime.toFixed(2) + " days"
        });
    } catch (err) {
        console.error("Error during transaction:", err);
        await t.rollback();
        res.status(500).json({ error: err.message });
    }
};







exports.getDetailsByModuleId = async (req, res) => {
    const { module_id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await ProcessDetail.findAndCountAll({
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
        const detail = await ProcessDetail.findByPk(id);
        if (detail) {
            res.status(200).json(detail);
        } else {
            res.status(404).json({ error: 'Detail not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateDetail = async (req, res) => {
    const { id } = req.params;
    const { nama_proses, waktu_m, output_per_unit, jumlah_kebutuhan_per_unit } = req.body;

    try {
        const detail = await ProcessDetail.findByPk(id);
        if (detail) {
            detail.nama_proses = nama_proses;
            detail.waktu_m = waktu_m;
            detail.output_per_unit = output_per_unit;
            detail.jumlah_kebutuhan_per_unit = jumlah_kebutuhan_per_unit;
            await detail.save();
            res.status(200).json({
                message: "Detail updated successfully",
                detail
            });
        } else {
            res.status(404).json({ error: 'Detail not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteDetail = async (req, res) => {
    const { id } = req.params;

    try {
        const detail = await ProcessDetail.findByPk(id);

        if (!detail) {
            return res.status(404).json({ error: 'Detail not found' });
        }

        await detail.destroy();
        res.status(200).json({ message: 'Detail deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while trying to delete the detail' });
    }
};
exports.getSumByProcessTypeAndProductionId = async (req, res) => {
    const { process_type, productionId } = req.params;

    try {
        // Log the inputs
        console.log(`Process Type: ${process_type}, Production ID: ${productionId}`);

        // Find all modules associated with the given productionId
        const modules = await ProductModule.findAll({
            where: { productionId },
            attributes: ['id']
        });

        // Log the modules found
        console.log('Modules found:', modules);

        if (!modules || modules.length === 0) {
            return res.status(404).json({ error: 'No modules found for the specified production ID' });
        }

        const moduleIds = modules.map(module => module.id);
        const totalSum = await ProcessDetail.sum('waktu_m_per_unit', {
            where: {
                process_type,
                module_id: moduleIds
            }
        });

        if (totalSum === null || totalSum === 0) {
            return res.status(404).json({ error: 'No details found for the specified process type within the given production ID' });
        }

        const totalInHours = Math.ceil((totalSum / 60) * 100) / 100;

        res.status(200).json({
            message: `Total sum of waktu_m_per_unit for process type ${process_type} within production ID ${productionId} is ${totalInHours} hours`,
            totalInHours
        });
    } catch (err) {
        console.error('Error:', err);  // Log the error for debugging
        res.status(500).json({ error: 'An error occurred while calculating the total sum' });
    }
};
