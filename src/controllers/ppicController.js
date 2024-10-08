const Production = require('../models/productionModel');
const ProductModule = require('../models/productModule');
const ProductionStep= require('../models/productionStepModel');
const ProcessDetail = require('../models/ProcessDetail');


const Machine = require('../models/machineModel');
const MachineModule = require('../models/machineModule');
const MachineStep = require('../models/machineStepModel');
const MachineDetail = require('../models/machineDetail');

exports.getAllProductions = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Production.findAndCountAll({
            include: [{
                model: ProductionStep,
                as: 'steps', 
            }, {
                model: ProductModule, 
                as: 'productModules',
                include: [{
                    model: ProcessDetail, // Include details jika masih diperlukan
                    as: 'details'
                }]
            }],
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);

        const productionData = rows.map(production => {
            let totalLeadTime = 0;
            let assyMH = 0;
            let assyMCH = 0;
            let testingMH = 0;
            let testingMCH = 0;

            // Hitung total lead time dari ProductionStep
            if (production.steps && production.steps.length > 0) {
                production.steps.forEach(step => {
                    totalLeadTime += parseFloat(step.lead_time) || 0;
                });
            }

            if (production.productModules && production.productModules.length > 0) {
                production.productModules.forEach(module => {
                    // Hitung ASSY MH
                    const assyMHDetails = module.details.filter(detail => detail.process_type === 'ASSY MH');
                    if (assyMHDetails.length > 0) {
                        const totalWaktuMPerUnit = assyMHDetails.reduce((sum, detail) => sum + detail.waktu_m_per_unit, 0);
                        assyMH += (totalWaktuMPerUnit / 60) * module.faktor_x;
                    }

                    // Hitung ASSY MCH
                    const assyMCHDetails = module.details.filter(detail => detail.process_type === 'ASSY MCH');
                    if (assyMCHDetails.length > 0) {
                        const totalWaktuMPerUnit = assyMCHDetails.reduce((sum, detail) => sum + detail.waktu_m_per_unit, 0);
                        assyMCH += (totalWaktuMPerUnit / 60);  // Tanpa dikali faktor_x
                    }

                    // Hitung TESTING MH
                    const testingMHDetails = module.details.filter(detail => detail.process_type === 'TESTING MH');
                    if (testingMHDetails.length > 0) {
                        const totalWaktuMPerUnit = testingMHDetails.reduce((sum, detail) => sum + detail.waktu_m_per_unit, 0);
                        testingMH += (totalWaktuMPerUnit / 60);  // Tanpa dikali faktor_x
                    }

                    // Hitung TESTING MCH (Dibagi 2 dari testingMH)
                    testingMCH = testingMH / 2;
                });
            }

            return {
                productionId: production.id,
                kode_produk: production.kode_produk,
                nama_produk: production.nama_produk,
                total_lead_time: totalLeadTime, // Lead time dari ProductionStep
                dok_production_lead_time: '', 
                pic_ppc: null, 
                keterangan: '',
                assy_mh: assyMH,
                assy_mch: assyMCH,
                testing_mh: testingMH,
                testing_mch: testingMCH
            };
        });

        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

        res.status(200).json({
            current_page: page,
            data: productionData,
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
            total: count,
            message: 'Productions data retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while retrieving productions data',
            details: error.message
        });
    }
};

exports.getAllMachines = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Machine.findAndCountAll({
            include: [{
                model: MachineStep,
                as: 'steps', 
            }, {
                model: MachineModule, // Include MachineModule jika masih diperlukan
                as: 'machineModules',
                include: [{
                    model: MachineDetail, // Include details jika masih diperlukan
                    as: 'details'
                }]
            }],
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);

        const machineData = rows.map(machine => {
            let totalLeadTime = 0;
            let assyMH = 0;
            let assyMCH = 0;
            let testingMH = 0;
            let testingMCH = 0;

            // Hitung total lead time dari MachineStep
            if (machine.steps && machine.steps.length > 0) {
                machine.steps.forEach(step => {
                    totalLeadTime += parseFloat(step.lead_time) || 0;
                });
            }

            if (machine.machineModules && machine.machineModules.length > 0) {
                machine.machineModules.forEach(module => {
                    // Hitung ASSY MH
                    const assyMHDetails = module.details.filter(detail => detail.process_type === 'ASSY MH');
                    if (assyMHDetails.length > 0) {
                        const totalWaktuMPerUnit = assyMHDetails.reduce((sum, detail) => sum + detail.waktu_m_per_unit, 0);
                        assyMH += (totalWaktuMPerUnit / 60) * module.faktor_x;
                    }

                    // Hitung ASSY MCH
                    const assyMCHDetails = module.details.filter(detail => detail.process_type === 'ASSY MCH');
                    if (assyMCHDetails.length > 0) {
                        const totalWaktuMPerUnit = assyMCHDetails.reduce((sum, detail) => sum + detail.waktu_m_per_unit, 0);
                        assyMCH += (totalWaktuMPerUnit / 60);  // Tanpa dikali faktor_x
                    }

                    // Hitung TESTING MH
                    const testingMHDetails = module.details.filter(detail => detail.process_type === 'TESTING MH');
                    if (testingMHDetails.length > 0) {
                        const totalWaktuMPerUnit = testingMHDetails.reduce((sum, detail) => sum + detail.waktu_m_per_unit, 0);
                        testingMH += (totalWaktuMPerUnit / 60);  // Tanpa dikali faktor_x
                    }

                    // Hitung TESTING MCH (Dibagi 2 dari testingMH)
                    testingMCH = testingMH / 2;
                });
            }

            return {
                machineId: machine.id,
                kode_mesin: machine.kode_mesin,
                total_lead_time: totalLeadTime, // Lead time dari MachineStep
                dok_production_lead_time: '', 
                pic_ppc: null, 
                keterangan: '',
                assy_mh: assyMH,
                assy_mch: assyMCH,
                testing_mh: testingMH,
                testing_mch: testingMCH
            };
        });

        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

        res.status(200).json({
            current_page: page,
            data: machineData,
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
            total: count,
            message: 'Machines data retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while retrieving machines data',
            details: error.message
        });
    }
};
