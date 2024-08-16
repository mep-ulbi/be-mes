/**
 * @swagger
 * components:
 *   schemas:
 *     Production:
 *       type: object
 *       required:
 *         - kode_produk
 *         - nama_produk
 *         - tahapan_proses
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the production
 *         kode_produk:
 *           type: string
 *           description: The product code
 *         nama_produk:
 *           type: string
 *           description: The product name
 *         tahapan_proses:
 *           type: string
 *           description: The production stage
 *         nama_proses_modul:
 *           type: string
 *           description: The process module name
 *         detail_proses:
 *           type: string
 *           description: The process details
 *       example:
 *         kode_produk: 5100000499
 *         nama_produk: JPL CONSOLE FRAUSCHER
 *         tahapan_proses: Internal Order/Review Order
 *         nama_proses_modul: Modul A
 *         detail_proses: Detail proses modul A
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * tags:
 *   name: Productions
 *   description: The production managing API
 */

/**
 * @swagger
 * /api/productions:
 *   post:
 *     summary: Create a new production with predefined steps and optional file upload
 *     tags: [Productions]
 *     description: >
 *       This endpoint creates a new production entry, populates it with predefined steps,
 *       and optionally handles a file upload. The file upload is optional and the steps
 *       are predefined in the server logic.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - kode_produk
 *               - nama_produk
 *             properties:
 *               kode_produk:
 *                 type: string
 *                 description: The product code for the new production.
 *               nama_produk:
 *                 type: string
 *                 description: The name of the product for the new production.
 *               productionFile:
 *                 type: string
 *                 format: binary
 *                 description: Optional file to upload related to the production.
 *             example:
 *               kode_produk: "12345"
 *               nama_produk: "JPL CONSOLE FRAUSCHER"
 *               productionFile: (binary file content)
 *     responses:
 *       201:
 *         description: The production was successfully created along with its predefined steps.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Production and steps created successfully"
 *                 productionId:
 *                   type: integer
 *                   example: 1
 *                 filePath:
 *                   type: string
 *                   example: "uploads/productionFile-123456789.png"
 *                   description: Path of the uploaded file, if any.
 *       400:
 *         description: Bad request, possibly due to missing required fields or file upload error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No file selected!"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to create production due to server error."
 */

/**
 * @swagger
 * /api/productions:
 *   get:
 *     summary: Returns the list of all the productions
 *     tags: [Productions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the productions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Production'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/productions/{id}:
 *   get:
 *     summary: Get the production by id
 *     tags: [Productions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The production id
 *     responses:
 *       200:
 *         description: The production description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Production'
 *       404:
 *         description: The production was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/productions/{id}:
 *   put:
 *     summary: Update a production
 *     tags: [Productions]
 *     description: Updates a production's details and optionally uploads a new file.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The production ID.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - kode_produk
 *               - nama_produk
 *             properties:
 *               kode_produk:
 *                 type: string
 *                 description: The product code.
 *               nama_produk:
 *                 type: string
 *                 description: The name of the product.
 *               productionFile:
 *                 type: string
 *                 format: binary
 *                 description: Optional new file to upload related to the production.
 *     responses:
 *       200:
 *         description: The production was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Production updated successfully"
 *                 production:
 *                   $ref: '#/components/schemas/Production'
 *       400:
 *         description: Bad request due to input validation failure or file upload error.
 *       404:
 *         description: Production not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/productions/{id}:
 *   delete:
 *     summary: Delete a production and its associated file
 *     tags: [Productions]
 *     description: >
 *       Deletes a production record from the database and also removes the associated file from the server's filesystem if it exists.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The production ID.
 *     responses:
 *       200:
 *         description: The production and associated file were successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Production and associated file deleted"
 *       404:
 *         description: Production not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Production not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */


/**
 * @swagger
 * /api/productions/steps/{productionId}:
 *   get:
 *     summary: Get all production steps for a specific production ID
 *     tags: [ProductionSteps]
 *     description: Retrieve all production steps associated with a specific production ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the production.
 *     responses:
 *       200:
 *         description: Production steps retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Production steps retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the production step.
 *                       productionId:
 *                         type: integer
 *                         description: The ID of the associated production.
 *                       step_name:
 *                         type: string
 *                         description: The name of the production step.
 *                       department:
 *                         type: string
 *                         description: The department responsible for the step.
 *                       lead_time:
 *                         type: string
 *                         nullable: true
 *                         description: The lead time for the step.
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         description: Additional description of the step.
 *       400:
 *         description: Invalid production ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid production ID."
 *                 data:
 *                   type: array
 *                   items: {}
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access."
 *                 data:
 *                   type: array
 *                   items: {}
 *       404:
 *         description: No production steps found for the given production ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "No production steps found for the given production ID."
 *                 data:
 *                   type: array
 *                   items: {}
 *       500:
 *         description: An error occurred while retrieving production steps.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "An error occurred while retrieving production steps."
 *                 data:
 *                   type: array
 *                   items: {}
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     ProductionStep:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the production step
 *         step_name:
 *           type: string
 *           description: The name of the production step
 *         department:
 *           type: string
 *           description: The department responsible for this step
 *         lead_time:
 *           type: number
 *           format: float
 *           description: The lead time in days
 *         description:
 *           type: string
 *           description: Additional details about the step
 *         productionId:
 *           type: integer
 *           description: The ID of the production this step belongs to
 *       example:
 *         id: 1
 *         step_name: "Internal Order / Review Order"
 *         department: "PPC Warehouse"
 *         lead_time: 2.0
 *         description: "Review and order materials"
 *         productionId: 10
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/productions/{productionId}/steps/{stepId}:
 *   get:
 *     summary: Get a specific production step by its ID and production ID
 *     tags: [ProductionSteps]
 *     description: Retrieve a specific production step based on the provided production ID and step ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The production ID
 *       - in: path
 *         name: stepId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the production step
 *     responses:
 *       200:
 *         description: The production step was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Production step retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/ProductionStep'
 *       400:
 *         description: Invalid production ID or step ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid production ID or step ID. Both must be positive numbers."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example: []
 *       404:
 *         description: Production step not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "No production step found for production ID 1 with step ID 2."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example: []
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "An error occurred while retrieving the production step."
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */

/**
 * @swagger
 * /api/productions/user/{userId}:
 *   get:
 *     summary: Get all productions created by a specific user
 *     tags: [Productions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user who created the productions
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
 *         description: List of productions created by the user retrieved successfully
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
 *                     $ref: '#/components/schemas/Production'
 *                 first_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/productions/user/1?page=1"
 *                 from:
 *                   type: integer
 *                   example: 1
 *                 last_page:
 *                   type: integer
 *                   example: 5
 *                 last_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/productions/user/1?page=5"
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         example: "http://localhost:5000/api/productions/user/1?page=2"
 *                       label:
 *                         type: string
 *                         example: "2"
 *                       active:
 *                         type: boolean
 *                         example: false
 *                 next_page_url:
 *                   type: string
 *                   example: "http://localhost:5000/api/productions/user/1?page=2"
 *                 path:
 *                   type: string
 *                   example: "http://localhost:5000/api/productions/user/1"
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
 *                   example: "An error occurred while retrieving the productions."
 */
