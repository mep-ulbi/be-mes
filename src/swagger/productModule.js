/**
 * @swagger
 * components:
 *   schemas:
 *     ProductModule:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the module
 *         productionId:
 *           type: integer
 *           description: The ID of the associated product
 *         nama_modul:
 *           type: string
 *           description: The name of the module
 *       example:
 *         id: 1
 *         productionId: 101
 *         nama_modul: "Modul A"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/modules:
 *   post:
 *     summary: Create a new module
 *     tags: [ProductModules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productionId
 *               - nama_modul
 *               - faktor_x
 *             properties:
 *               productionId:
 *                 type: integer
 *                 description: The ID of the associated product
 *               nama_modul:
 *                 type: string
 *                 description: The name of the module
 *             example:
 *               productionId: 101
 *               nama_modul: "Modul A"
 *               factor_x: 1  
 *     responses:
 *       201:
 *         description: Module created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Module created successfully"
 *                 moduleId:
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
 *                   example: "Failed to create module due to server error."
 */

/**
 * @swagger
 * /api/modules:
 *   get:
 *     summary: Get all modules with pagination
 *     tags: [ProductModules]
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
 *         description: List of modules retrieved successfully
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
 *                     $ref: '#/components/schemas/ProductModule'
 *                 first_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/modules?page=1"
 *                 from:
 *                   type: integer
 *                   example: 1
 *                 last_page:
 *                   type: integer
 *                   example: 5
 *                 last_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/modules?page=5"
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         example: "http://localhost:5000/api/modules?page=2"
 *                       label:
 *                         type: string
 *                         example: "2"
 *                       active:
 *                         type: boolean
 *                         example: false
 *                 next_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/modules?page=2"
 *                 path:
 *                   type: string
 *                   example: "http://localhost:5000/api/modules"
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
 *                   example: "Failed to retrieve modules due to server error."
 */

/**
 * @swagger
 * /api/modules/{id}:
 *   get:
 *     summary: Get a module by ID
 *     tags: [ProductModules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The module ID
 *     responses:
 *       200:
 *         description: Module retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductModule'
 *       404:
 *         description: Module not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Module not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to retrieve module due to server error."
 */

/**
 * @swagger
 * /api/modules/{id}:
 *   put:
 *     summary: Update a module
 *     tags: [ProductModules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The module ID
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
 *               nama_modul: "Modul B"
 *     responses:
 *       200:
 *         description: Module updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Module updated successfully"
 *                 module:
 *                   $ref: '#/components/schemas/ProductModule'
 *       404:
 *         description: Module not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Module not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to update module due to server error."
 */

/**
 * @swagger
 * /api/modules/{id}:
 *   delete:
 *     summary: Delete a module
 *     tags: [ProductModules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The module ID
 *     responses:
 *       200:
 *         description: Module deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Module deleted successfully"
 *       404:
 *         description: Module not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Module not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to delete module due to server error."
 */

/**
 * @swagger
 * /api/modules/production/{productionId}:
 *   get:
 *     summary: Get modules by production ID with pagination
 *     tags: [ProductModules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the production to retrieve modules for
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: List of modules retrieved successfully
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
 *                     $ref: '#/components/schemas/ProductModule'
 *                 first_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/modules/production/1?page=1"
 *                 from:
 *                   type: integer
 *                   example: 1
 *                 last_page:
 *                   type: integer
 *                   example: 5
 *                 last_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/modules/production/1?page=5"
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         example: "http://localhost:5000/api/modules/production/1?page=2"
 *                       label:
 *                         type: string
 *                         example: "2"
 *                       active:
 *                         type: boolean
 *                         example: false
 *                 next_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/modules/production/1?page=2"
 *                 path:
 *                   type: string
 *                   example: "http://localhost:5000/api/modules/production/1"
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
 *         description: No modules found for the given production ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No modules found for the given production ID."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while retrieving the modules."
 */

