const Production = require('../models/productionModel');
const ProductionStep = require('../models/productionStepModel');
const { sequelize } = require('../config/db');
const upload = require('../config/multerConfig');
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
exports.createProduction = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(400).json({ error: err });
            return;
        }

        const { kode_produk, nama_produk } = req.body;
        const filePath = req.file ? req.file.filename : null;        
        const t = await sequelize.transaction();

        try {
            const production = await Production.create({
                kode_produk,
                nama_produk,
                filePath 
            }, { transaction: t });

            for (const step of predefinedSteps) {
                await ProductionStep.create({
                    productionId: production.id,
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
                response_code: 201,
                data: production,
                message: "Production and steps created successfully",
                productionId: production.id,
                filePath: req.file ? req.file.path : "No file uploaded"
            });
        } catch (err) {
            await t.rollback();
            res.status(500).json({ error: err.message });
        }
    });
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
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads`;

        // Map over the rows and modify the filePath to include the full URL
        const productions = rows.map(production => {
            return {
                ...production.toJSON(),
                filePath: production.filePath ? `${baseUrl}/${production.filePath}` : null
            };
        });

        res.status(200).json({
            current_page: page,
            data: productions,
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
exports.updateProduction = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(400).json({ error: err });
            return;
        }

        const { id } = req.params;
        const { kode_produk, nama_produk } = req.body;

        try {
            const production = await Production.findByPk(id);
            if (production) {
                production.kode_produk = kode_produk;
                production.nama_produk = nama_produk;
                
                if (req.file) {
                    production.filePath = req.file.filename; 
                }

                await production.save();
                res.status(200).json({
                    message: "Production updated successfully",
                    production
                });
            } else {
                res.status(404).json({ error: 'Production not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
};

// Delete production
exports.deleteProduction = async (req, res) => {
    const { id } = req.params;
    try {
        const production = await Production.findByPk(id);
        if (production) {
            if (production.filePath) {
                const filePath = path.join(__dirname, '..', 'uploads', production.filePath);
                
                try {
                    await fs.access(filePath);
                    await fs.unlink(filePath);
                    console.log("File deleted:", production.filePath);
                } catch (err) {
                    if (err.code === 'ENOENT') {
                        console.log("File not found, skipping deletion:", production.filePath);
                    } else {
                        console.error("Error deleting file:", err);
                        return res.status(500).json({ error: 'Failed to delete associated file' });
                    }
                }
            }

            await production.destroy();
            res.status(200).json({ message: 'Production and associated file deleted' });
        } else {
            res.status(404).json({ error: 'Production not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getProductionStepsByProductionId = async (req, res) => {
    const { productionId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Log the productionId to debug
    console.log(`Received productionId: ${productionId}`);

    try {
        // Convert productionId to a number explicitly
        const numericProductionId = Number(productionId);
        if (isNaN(numericProductionId) || numericProductionId <= 0) {
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid production ID. It must be a positive number.',
                data: []
            });
        }

        // Find and count all production steps for the specific productionId
        const { count, rows } = await ProductionStep.findAndCountAll({
            where: { productionId: numericProductionId },
            limit,
            offset
        });

        if (count === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: `No production steps found for production ID ${numericProductionId}.`,
                data: []
            });
        }

        const totalPages = Math.ceil(count / limit);
        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;

        res.status(200).json({
            statusCode: 200,
            message: 'Production steps retrieved successfully.',
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
            message: 'An error occurred while retrieving production steps.',
            data: [],
            error: err.message
        });
    }
};
exports.getProductionStepByIdAndProductionId = async (req, res) => {
    const { productionId, stepId: id } = req.params;

    try {
        console.log(`Received productionId: ${productionId}, id: ${id}`);

        const numericProductionId = parseInt(productionId, 10);
        const numericId = parseInt(id, 10);

        console.log(`Parsed productionId: ${numericProductionId}, Parsed id: ${numericId}`);

        if (isNaN(numericProductionId) || numericProductionId <= 0 || isNaN(numericId) || numericId <= 0) {
            console.log('Invalid production ID or step ID detected.');
            return res.status(400).json({
                statusCode: 400,
                message: 'Invalid production ID or step ID. Both must be positive numbers.',
                data: []
            });
        }

        const step = await ProductionStep.findOne({
            where: {
                productionId: numericProductionId,
                id: numericId
            }
        });

        if (!step) {
            return res.status(404).json({
                statusCode: 404,
                message: `No production step found for production ID ${numericProductionId} with step ID ${numericId}.`,
                data: []
            });
        }

        res.status(200).json({
            statusCode: 200,
            message: 'Production step retrieved successfully.',
            data: step
        });
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({
            statusCode: 500,
            message: 'An error occurred while retrieving the production step.',
            data: [],
            error: err.message
        });
    }
};



// Start a production step
exports.startStep = async (req, res) => {
  const { productionId, stepId } = req.params;
  console.log(productionId, stepId);
  try {
    const numericProductionId = parseInt(productionId, 10);
    const numericStepId = parseInt(stepId, 10);

    if (isNaN(numericProductionId) || isNaN(numericStepId)) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Invalid production ID or step ID. Both must be numbers.',
            data: []
        });
    }
    const step = await ProductionStep.findOne({ where: { id: numericStepId, productionId: numericProductionId } });
    if (!step) {
          return res.status(404).json({
              statusCode: 404,
              message: 'Production step not found.',
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
          message: 'Production step started.',
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

// Hold a production step
exports.holdStep = async (req, res) => {
    const { productionId, stepId } = req.params;
    try {
        const step = await ProductionStep.findOne({ where: { id: stepId, productionId } });
        if (!step) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Production step not found.',
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
            message: 'Production step held.',
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

// Continue a production step
exports.continueStep = async (req, res) => {
    const { productionId, stepId } = req.params;
    try {
        const step = await ProductionStep.findOne({ where: { id: stepId, productionId } });
        if (!step) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Production step not found.',
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
            message: 'Production step resumed.',
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

// End a production step
exports.endStep = async (req, res) => {
    const { productionId, stepId } = req.params;
    try {
        const step = await ProductionStep.findOne({ where: { id: stepId, productionId } });
        if (!step) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Production step not found.',
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
            message: 'Production step ended and lead time calculated.',
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

exports.calculateTotalLeadTime = async (req, res) => {
    const { productionId } = req.params;

    try {
        // Fetch all steps related to the productionId
        const steps = await ProductionStep.findAll({
            where: { productionId },
            attributes: ['lead_time', 'step_name'],            
            order: [['id', 'ASC']] // Order by id or any other relevant column
        });

        if (!steps || steps.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: `No production steps found for production ID ${productionId}.`,
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
        // Sum the lead_time values
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
