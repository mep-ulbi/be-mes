/**
 * @swagger
 * components:
 *   schemas:
 *     ProcessDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the process detail
 *         module_id:
 *           type: integer
 *           description: The ID of the associated module
 *         nama_proses:
 *           type: string
 *           description: The name of the process
 *         waktu_m:
 *           type: number
 *           format: float
 *           description: The time in minutes for the process
 *         output_per_unit:
 *           type: number
 *           format: integer
 *           description: The output per unit
 *         jumlah_kebutuhan_per_unit:
 *           type: number
 *           format: integer
 *           description: The quantity needed per unit
 *         process_type:
 *           type: string
 *           enum: ['ASSY MH', 'ASSY MCH', 'TESTING MH']
 *           description: The type of process (ASSY MH, ASSY MCH, or TESTING MH)
 *         utilisasi_mesin:
 *           type: string
 *           enum: ['SMT (sistem)', 'Wave Solder', 'Mesin Coating', 'Mesin Cutting', 'Mesin Bending', 'Mesin Cut Din Rail', 'Mesin Cut Duct Cable', 'Mesin BOR', 'Mesin Gerinda', 'Wire Processor']
 *           description: The type of machine utilization (e.g., SMT (sistem), Wave Solder)
 *       example:
 *         id: 1
 *         module_id: 1
 *         nama_proses: "Proses A"
 *         waktu_m: 60.0
 *         output_per_unit: 100
 *         jumlah_kebutuhan_per_unit: 5
 *         process_type: "ASSY MH"
 *         utilisasi_mesin: "Mesin Cutting"
 */

/**
 * @swagger
 * /api/details:
 *   post:
 *     summary: Create a new process detail
 *     tags: [ProcessDetails]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - module_id
 *               - nama_proses
 *               - waktu_m
 *               - output_per_unit
 *               - jumlah_kebutuhan_per_unit
 *               - process_type
 *               - utilisasi_mesin
 *             properties:
 *               module_id:
 *                 type: integer
 *                 description: The ID of the associated module
 *               nama_proses:
 *                 type: string
 *                 description: The name of the process
 *               waktu_m:
 *                 type: number
 *                 format: float
 *                 description: The time in minutes for the process
 *               output_per_unit:
 *                 type: number
 *                 format: integer
 *                 description: The output per unit
 *               jumlah_kebutuhan_unit:
 *                 type: number
 *                 format: integer
 *                 description: The quantity needed per unit
 *               process_type:
 *                 type: string
 *                 enum: ['ASSY MH', 'ASSY MCH', 'TESTING MH']
 *                 description: The type of process (ASSY MH, ASSY MCH, or TESTING MH)
 *               utilisasi_mesin:
 *                 type: string
 *                 enum: ['SMT (sistem)', 'Wave Solder', 'Mesin Coating', 'Mesin Cutting', 'Mesin Bending', 'Mesin Cut Din Rail', 'Mesin Cut Duct Cable', 'Mesin BOR', 'Mesin Gerinda', 'Wire Processor']
 *                 description: The type of machine utilization
 *             example:
 *               module_id: 1
 *               nama_proses: "Proses A"
 *               waktu_m: 60.0
 *               output_per_unit: 100
 *               jumlah_kebutuhan_per_unit: 5
 *               process_type: "ASSY MH"
 *               utilisasi_mesin: "Mesin Cutting"
 *     responses:
 *       201:
 *         description: Process detail created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Process detail created successfully"
 *                 detailId:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create process detail due to server error."
 */

/**
 * @swagger
 * /api/details/{module_id}:
 *   get:
 *     summary: Get all process details by module ID with pagination
 *     tags: [ProcessDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: module_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The module ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: List of process details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 current_page:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProcessDetail'
 *                 first_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/details/1?page=1"
 *                 from:
 *                   type: integer
 *                   example: 1
 *                 last_page:
 *                   type: integer
 *                   example: 5
 *                 last_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/details/1?page=5"
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         example: "http://localhost:5000/api/details/1?page=2"
 *                       label:
 *                         type: string
 *                         example: "2"
 *                       active:
 *                         type: boolean
 *                         example: false
 *                 next_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/details/1?page=2"
 *                 path:
 *                   type: string
 *                   example: "http://localhost:5000/api/details/1"
 *                 per_page:
 *                   type: integer
 *                   example: 10
 *                 prev_page_url:
 *                   type: string
 *                   example: null
 *                 to:
 *                   type: integer
 *                   example: 10
 *                 total:
 *                   type: integer
 *                   example: 50
 *       404:
 *         description: Process details not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No process details found for the given module ID."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to retrieve process details due to server error."
 */

/**
 * @swagger
 * /api/details/detail/{id}:
 *   get:
 *     summary: Get a process detail by ID
 *     tags: [ProcessDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The process detail ID
 *     responses:
 *       200:
 *         description: Process detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProcessDetail'
 *       404:
 *         description: Process detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Process detail not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to retrieve process detail due to server error."
 */

/**
 * @swagger
 * /api/details/detail/{id}:
 *   put:
 *     summary: Update a process detail
 *     tags: [ProcessDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The process detail ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_proses
 *               - waktu_m
 *               - output_per_unit
 *               - jumlah_kebutuhan_per_unit
 *               - process_type
 *               - utilisasi_mesin
 *             properties:
 *               nama_proses:
 *                 type: string
 *                 description: The name of the process
 *               waktu_m:
 *                 type: number
 *                 format: float
 *                 description: The time in minutes for the process
 *               output_per_unit:
 *                 type: number
 *                 format: integer
 *                 description: The output per unit
 *               jumlah_kebutuhan_per_unit:
 *                 type: number
 *                 format: integer
 *                 description: The quantity needed per unit
 *               process_type:
 *                 type: string
 *                 enum: ['ASSY MH', 'ASSY MCH', 'TESTING MH']
 *                 description: The type of process (ASSY MH, ASSY MCH, or TESTING MH)
 *               utilisasi_mesin:
 *                 type: string
 *                 enum: ['SMT (sistem)', 'Wave Solder', 'Mesin Coating', 'Mesin Cutting', 'Mesin Bending', 'Mesin Cut Din Rail', 'Mesin Cut Duct Cable', 'Mesin BOR', 'Mesin Gerinda', 'Wire Processor']
 *                 description: The type of machine utilization (e.g., SMT (sistem), Wave Solder)
 *             example:
 *               nama_proses: "Proses B"
 *               waktu_m: 30.0
 *               output_per_unit: 200
 *               jumlah_kebutuhan_per_unit: 3
 *               process_type: "TESTING MH"
 *               utilisasi_mesin: "Mesin Cutting"
 *     responses:
 *       200:
 *         description: Process detail updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Process detail updated successfully"
 *                 detail:
 *                   $ref: '#/components/schemas/ProcessDetail'
 *       404:
 *         description: Process detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Process detail not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to update process detail due to server error."
 */

/**
 * @swagger
 * /api/details/detail/{id}:
 *   delete:
 *     summary: Delete a process detail
 *     tags: [ProcessDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The process detail ID
 *     responses:
 *       200:
 *         description: Process detail deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Process detail deleted successfully"
 *       404:
 *         description: Process detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Process detail not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete process detail due to server error."
 */

/**
 * @swagger
 * /api/productions/{productionId}/sum/{process_type}:
 *   get:
 *     summary: Get the total sum of waktu_m_per_unit for a specific process type within a production
 *     tags: [ProcessDetails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the production
 *       - in: path
 *         name: process_type
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of process (e.g., ASSY MH, ASSY MCH, TESTING MH)
 *     responses:
 *       200:
 *         description: Total sum of waktu_m_per_unit calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Total sum of waktu_m_per_unit for process type ASSY MH within production ID 3 is 2.5 hours"
 *                 totalInHours:
 *                   type: number
 *                   format: float
 *                   example: 2.5
 *       404:
 *         description: No details found for the specified process type within the given production ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No details found for the specified process type within the given production ID"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while calculating the total sum"
 */
