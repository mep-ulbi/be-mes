const Production = require('../models/productionModel');
const ProductModule = require('../models/productModule');
const ProcessDetail = require('../models/ProcessDetail');

exports.getAllProductions = async (req, res) => {
    try {
        const productions = await Production.findAll({
            include: [{
                model: ProductModule,
                as: 'productModules',
                include: [{
                    model: ProcessDetail,
                    as: 'details'
                }]
            }]
        });

        const productionData = productions.map(production => {
            let totalLeadTime = 0;
            let assyMH = 0;
            let assyMCH = 0;
            let testingMH = 0;
            let testingMCH = 0;

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

                // Hitung total lead time
                totalLeadTime += parseFloat(module.lead_time) || 0;
            });

            return {
                productionId: production.id,
                kode_produk: production.kode_produk,
                total_lead_time: totalLeadTime,
                dok_production_lead_time: '', 
                pic_ppc: null, 
                keterangan: '',
                assy_mh: assyMH,
                assy_mch: assyMCH,
                testing_mh: testingMH,
                testing_mch: testingMCH
            };
        });

        res.status(200).json({
            data: productionData,
            message: 'Productions data retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while retrieving productions data',
            details: error.message
        });
    }
};
