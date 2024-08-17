/**
 * @swagger
 * components:
 *   schemas:
 *     MachineModule:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the machine module
 *         machineId:
 *           type: integer
 *           description: The ID of the associated machine
 *         nama_modul:
 *           type: string
 *           description: The name of the module
 *         faktor_x:
 *           type: number
 *           format: float
 *           description: The factor X associated with the module
 *       example:
 *         id: 1
 *         machineId: 1
 *         nama_modul: "Module A"
 *         faktor_x: 1.5
 */

/**
 * @swagger
 * /api/machine-modules:
 *   post:
 *     summary: Create a new machine module
 *     tags: [MachineModules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - machineId
 *               - nama_modul
 *               - faktor_x
 *             properties:
 *               machineId:
 *                 type: integer
 *                 description: The ID of the associated machine
 *               nama_modul:
 *                 type: string
 *                 description: The name of the module
 *               faktor_x:
 *                 type: number
 *                 format: float
 *                 description: The factor X associated with the module
 *             example:
 *               machineId: 1
 *               nama_modul: "Module A"
 *               faktor_x: 1.5
 *     responses:
 *       201:
 *         description: Machine module created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Machine module created successfully"
 *                 moduleId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request due to missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "productionId is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while creating the machine module."
 */

/**
 * @swagger
 * /api/machine-modules:
 *   get:
 *     summary: Get all machine modules with pagination
 *     tags: [MachineModules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: List of machine modules retrieved successfully
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
 *                     $ref: '#/components/schemas/MachineModule'
 *                 first_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/machine-modules?page=1"
 *                 from:
 *                   type: integer
 *                   example: 1
 *                 last_page:
 *                   type: integer
 *                   example: 5
 *                 last_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/machine-modules?page=5"
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         example: "http://localhost:5000/api/machine-modules?page=2"
 *                       label:
 *                         type: string
 *                         example: "2"
 *                       active:
 *                         type: boolean
 *                         example: false
 *                 next_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/machine-modules?page=2"
 *                 path:
 *                   type: string
 *                   example: "http://localhost:5000/api/machine-modules"
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while retrieving the machine modules."
 */

/**
 * @swagger
 * /api/machine-modules/machine/{machineId}:
 *   get:
 *     summary: Get all machine modules by machine ID with pagination
 *     tags: [MachineModules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: machineId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine ID
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
 *         description: List of machine modules retrieved successfully
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
 *                     $ref: '#/components/schemas/MachineModule'
 *                 first_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/machine-modules/machine/1?page=1"
 *                 from:
 *                   type: integer
 *                   example: 1
 *                 last_page:
 *                   type: integer
 *                   example: 5
 *                 last_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/machine-modules/machine/1?page=5"
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         example: "http://localhost:5000/api/machine-modules/machine/1?page=2"
 *                       label:
 *                         type: string
 *                         example: "2"
 *                       active:
 *                         type: boolean
 *                         example: false
 *                 next_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/machine-modules/machine/1?page=2"
 *                 path:
 *                   type: string
 *                   example: "http://localhost:5000/api/machine-modules/machine/1"
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
 *         description: Machine modules not found for the given machine ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No modules found for machine ID 1"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while retrieving the machine modules."
 */

/**
 * @swagger
 * /api/machine-modules/{id}:
 *   get:
 *     summary: Get a machine module by ID
 *     tags: [MachineModules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine module ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: The page number for details pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of items per page for details pagination
 *     responses:
 *       200:
 *         description: Machine module retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 module:
 *                   $ref: '#/components/schemas/MachineModule'
 *                 details_pagination:
 *                   type: object
 *                   properties:
 *                     current_page:
 *                       type: integer
 *                       example: 1
 *                     per_page:
 *                       type: integer
 *                       example: 5
 *                     total:
 *                       type: integer
 *                       example: 10
 *                     total_pages:
 *                       type: integer
 *                       example: 2
 *                     from:
 *                       type: integer
 *                       example: 1
 *                     to:
 *                       type: integer
 *                       example: 5
 *                     first_page_url:
 *                       type: string
 *                       example: "http://localhost:5000/api/machine-modules/1?page=1&limit=5"
 *                     last_page_url:
 *                       type: string
 *                       example: "http://localhost:5000/api/machine-modules/1?page=2&limit=5"
 *                     prev_page_url:
 *                       type: string
 *                       example: null
 *                     next_page_url:
 *                       type: string
 *                       example: "http://localhost:5000/api/machine-modules/1?page=2&limit=5"
 *       404:
 *         description: Machine module not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Module not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while retrieving the machine module."
 */

/**
 * @swagger
 * /api/machine-modules/{id}:
 *   put:
 *     summary: Update a machine module
 *     tags: [MachineModules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine module ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_modul
 *             properties:
 *               nama_modul:
 *                 type: string
 *                 description: The name of the module
 *             example:
 *               nama_modul: "Module B"
 *     responses:
 *       200:
 *         description: Machine module updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Machine module updated successfully"
 *                 module:
 *                   $ref: '#/components/schemas/MachineModule'
 *       404:
 *         description: Machine module not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Module not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while updating the machine module."
 */

/**
 * @swagger
 * /api/machine-modules/{id}:
 *   delete:
 *     summary: Delete a machine module
 *     tags: [MachineModules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine module ID
 *     responses:
 *       200:
 *         description: Machine module deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Machine module deleted"
 *       404:
 *         description: Machine module not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Module not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while deleting the machine module."
 */

