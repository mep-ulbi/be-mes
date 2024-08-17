/**
 * @swagger
 * components:
 *   schemas:
 *     Machine Detail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the machine step
 *         module_id:
 *           type: integer
 *           description: The ID of the associated machine module
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
 * /api/machine-details:
 *   post:
 *     summary: Create a new machine step detail
 *     tags: [Machine Detail]
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
 *                 description: The ID of the associated machine module
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
 *         description: Machine step created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Machine step created successfully"
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
 *                   example: "Failed to create machine step due to server error."
 */

/**
 * @swagger
 * /api/machine-details/{module_id}:
 *   get:
 *     summary: Get all machine step details by module ID with pagination
 *     tags: [Machine Detail]
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
 *         description: List of machine step details retrieved successfully
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
 *                     $ref: '#/components/schemas/MachineStep'
 *                 first_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/machine-details/1?page=1"
 *                 from:
 *                   type: integer
 *                   example: 1
 *                 last_page:
 *                   type: integer
 *                   example: 5
 *                 last_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/machine-details/1?page=5"
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         example: "http://localhost:5000/api/machine-details/1?page=2"
 *                       label:
 *                         type: string
 *                         example: "2"
 *                       active:
 *                         type: boolean
 *                         example: false
 *                 next_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/machine-details/1?page=2"
 *                 path:
 *                   type: string
 *                   example: "http://localhost:5000/api/machine-details/1"
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
 *         description: Machine step details not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No machine step details found for the given module ID."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to retrieve machine step details due to server error."
 */

/**
 * @swagger
 * /api/machine-details/detail/{id}:
 *   get:
 *     summary: Get a machine step detail by ID
 *     tags: [Machine Detail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine step detail ID
 *     responses:
 *       200:
 *         description: Machine step detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MachineStep'
 *       404:
 *         description: Machine step detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Machine step detail not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to retrieve machine step detail due to server error."
 */

/**
 * @swagger
 * /api/machine-details/detail/{id}:
 *   put:
 *     summary: Update a machine step detail
 *     tags: [Machine Detail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine step detail ID
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
 *         description: Machine step detail updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Machine step detail updated successfully"
 *                 detail:
 *                   $ref: '#/components/schemas/MachineStep'
 *       404:
 *         description: Machine step detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Machine step detail not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to update machine step detail due to server error."
 */

/**
 * @swagger
 * /api/machine-details/detail/{id}:
 *   delete:
 *     summary: Delete a machine step detail
 *     tags: [Machine Detail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine step detail ID
 *     responses:
 *       200:
 *         description: Machine step detail deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Machine step detail deleted successfully"
 *       404:
 *         description: Machine step detail not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Machine step detail not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete machine step detail due to server error."
 */

/**
 * @swagger
 * /api/machines/{machineId}/sum/{process_type}:
 *   get:
 *     summary: Get the total sum of waktu_m_per_unit for a specific process type within a machine
 *     tags: [Machine Detail]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: machineId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the machine
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
 *                   example: "Total sum of waktu_m_per_unit for process type ASSY MH within machine ID 3 is 2.5 hours"
 *                 totalInHours:
 *                   type: number
 *                   format: float
 *                   example: 2.5
 *       404:
 *         description: No details found for the specified process type within the given machine ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No details found for the specified process type within the given machine ID"
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
