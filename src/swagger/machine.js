/**
 * @swagger
 * components:
 *   schemas:
 *     Machine:
 *       type: object
 *       required:
 *         - kode_mesin
 *         - nama_mesin
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the machine
 *         kode_mesin:
 *           type: string
 *           description: The machine code
 *         nama_mesin:
 *           type: string
 *           description: The machine name
 *         filePath:
 *           type: string
 *           description: The path of the uploaded file
 *       example:
 *         kode_mesin: MCH-001
 *         nama_mesin: "Cutting Machine"
 *         filePath: "uploads/machine-manual.pdf"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * tags:
 *   name: Machines
 *   description: The machine managing API
 */

/**
 * @swagger
 * /api/machines:
 *   post:
 *     summary: Create a new machine with predefined steps and optional file upload
 *     tags: [Machines]
 *     description: >
 *       This endpoint creates a new machine entry, populates it with predefined steps,
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
 *               - kode_mesin
 *               - nama_mesin
 *             properties:
 *               kode_mesin:
 *                 type: string
 *                 description: The machine code for the new machine.
 *               nama_mesin:
 *                 type: string
 *                 description: The name of the machine for the new machine.
 *               machineFile:
 *                 type: string
 *                 format: binary
 *                 description: Optional file to upload related to the machine.
 *             example:
 *               kode_mesin: "MCH-001"
 *               nama_mesin: "Cutting Machine"
 *               machineFile: (binary file content)
 *     responses:
 *       201:
 *         description: The machine was successfully created along with its predefined steps.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Machine and steps created successfully"
 *                 machineId:
 *                   type: integer
 *                   example: 1
 *                 filePath:
 *                   type: string
 *                   example: "uploads/machineFile-123456789.png"
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
 *                   example: "Failed to create machine due to server error."
 */

/**
 * @swagger
 * /api/machines:
 *   get:
 *     summary: Get all machines
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: List of machines
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 current_page:
 *                   type: integer
 *                   description: Current page number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Machine'
 *                 first_page_url:
 *                   type: string
 *                   description: URL for the first page
 *                 from:
 *                   type: integer
 *                   description: Starting item number
 *                 last_page:
 *                   type: integer
 *                   description: Last page number
 *                 last_page_url:
 *                   type: string
 *                   description: URL for the last page
 *                 next_page_url:
 *                   type: string
 *                   description: URL for the next page
 *                 path:
 *                   type: string
 *                   description: Base URL for the API
 *                 per_page:
 *                   type: integer
 *                   description: Number of items per page
 *                 prev_page_url:
 *                   type: string
 *                   description: URL for the previous page
 *                 to:
 *                   type: integer
 *                   description: Ending item number
 *                 total:
 *                   type: integer
 *                   description: Total number of items
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/machines/{id}:
 *   get:
 *     summary: Get a machine by ID
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine ID
 *     responses:
 *       200:
 *         description: Machine details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Machine'
 *       404:
 *         description: Machine not found
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /api/machines/{id}:
 *   put:
 *     summary: Update a machine
 *     tags: [Machines]
 *     description: Updates a machine's details and optionally uploads a new file.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine ID.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - kode_mesin
 *               - nama_mesin
 *             properties:
 *               kode_mesin:
 *                 type: string
 *                 description: The machine code.
 *               nama_mesin:
 *                 type: string
 *                 description: The name of the machine.
 *               machineFile:
 *                 type: string
 *                 format: binary
 *                 description: Optional new file to upload related to the machine.
 *     responses:
 *       200:
 *         description: The machine was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Machine updated successfully"
 *                 machine:
 *                   $ref: '#/components/schemas/Machine'
 *       400:
 *         description: Bad request due to input validation failure or file upload error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid input or file upload error."
 *       404:
 *         description: Machine not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Machine not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while updating the machine."
 */

/**
 * @swagger
 * /api/machines/{id}:
 *   delete:
 *     summary: Delete a machine
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine ID
 *     responses:
 *       200:
 *         description: Machine deleted successfully
 *       404:
 *         description: Machine not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/machines/steps/{machineId}:
 *   get:
 *     summary: Get all steps for a specific machine
 *     tags: [Machine Steps]
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
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: List of steps for the specified machine
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 current_page:
 *                   type: integer
 *                   description: Current page number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MachineStep'
 *                 first_page_url:
 *                   type: string
 *                   description: URL for the first page
 *                 from:
 *                   type: integer
 *                   description: Starting item number
 *                 last_page:
 *                   type: integer
 *                   description: Last page number
 *                 last_page_url:
 *                   type: string
 *                   description: URL for the last page
 *                 next_page_url:
 *                   type: string
 *                   description: URL for the next page
 *                 path:
 *                   type: string
 *                   description: Base URL for the API
 *                 per_page:
 *                   type: integer
 *                   description: Number of items per page
 *                 prev_page_url:
 *                   type: string
 *                   description: URL for the previous page
 *                 to:
 *                   type: integer
 *                   description: Ending item number
 *                 total:
 *                   type: integer
 *                   description: Total number of items
 *       404:
 *         description: Machine steps not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/machines/{machineId}/steps/{stepId}:
 *   get:
 *     summary: Get a specific machine step by machine ID and step ID
 *     tags: [Machine Steps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: machineId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine ID
 *       - in: path
 *         name: stepId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The step ID
 *     responses:
 *       200:
 *         description: Machine step retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MachineStep'
 *       404:
 *         description: Machine step not found
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /api/machines/{machineId}/steps/{stepId}/start:
 *   put:
 *     summary: Start a machine step
 *     tags: [MachineSteps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: machineId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine ID
 *       - in: path
 *         name: stepId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the machine step
 *     responses:
 *       200:
 *         description: Machine step started
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
 *                   example: "Machine step started."
 *                 data:
 *                   $ref: '#/components/schemas/MachineStep'
 *       400:
 *         description: Step already started or other validation error
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
 *                   example: "Step already started."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example: []
 *       404:
 *         description: Machine step not found
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
 *                   example: "Machine step not found."
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
 *                   example: "An error occurred while starting the step."
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */

/**
 * @swagger
 * /api/machines/{machineId}/steps/{stepId}/hold:
 *   put:
 *     summary: Hold a machine step
 *     tags: [MachineSteps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: machineId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine ID
 *       - in: path
 *         name: stepId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the machine step
 *     responses:
 *       200:
 *         description: Machine step held
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
 *                   example: "Machine step held."
 *                 data:
 *                   $ref: '#/components/schemas/MachineStep'
 *       400:
 *         description: Step is not in progress or already completed
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
 *                   example: "Step is not in progress or already completed."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example: []
 *       404:
 *         description: Machine step not found
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
 *                   example: "Machine step not found."
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
 *                   example: "An error occurred while holding the step."
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */

/**
 * @swagger
 * /api/machines/{machineId}/steps/{stepId}/continue:
 *   put:
 *     summary: Continue a machine step
 *     tags: [MachineSteps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: machineId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine ID
 *       - in: path
 *         name: stepId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the machine step
 *     responses:
 *       200:
 *         description: Machine step resumed
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
 *                   example: "Machine step resumed."
 *                 data:
 *                   $ref: '#/components/schemas/MachineStep'
 *       400:
 *         description: Step is not on hold or other validation error
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
 *                   example: "Step is not on hold."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example: []
 *       404:
 *         description: Machine step not found
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
 *                   example: "Machine step not found."
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
 *                   example: "An error occurred while resuming the step."
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */

/**
 * @swagger
 * /api/machines/{machineId}/steps/{stepId}/end:
 *   put:
 *     summary: End a machine step
 *     tags: [MachineSteps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: machineId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine ID
 *       - in: path
 *         name: stepId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the machine step
 *     responses:
 *       200:
 *         description: Machine step ended and lead time calculated
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
 *                   example: "Machine step ended and lead time calculated."
 *                 data:
 *                   $ref: '#/components/schemas/MachineStep'
 *       400:
 *         description: Step already ended or other validation error
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
 *                   example: "Step already ended or cannot be ended due to another condition."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example: []
 *       404:
 *         description: Machine step not found
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
 *                   example: "Machine step not found."
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
 *                   example: "An error occurred while ending the step."
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */

/**
 * @swagger
 * /api/machines/{machineId}/total-lead-time:
 *   get:
 *     summary: Calculate the total lead time for a specific machine
 *     tags: [Machine]
 *     security:
 *       - bearerAuth: []
 *     description: Calculate the total lead time for all steps in a machine.
 *     parameters:
 *       - in: path
 *         name: machineId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine ID
 *     responses:
 *       200:
 *         description: Total lead time calculated successfully
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
 *                   example: "Total lead time calculated successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalLeadTime:
 *                       type: string
 *                       example: "21.28 Hari"
 *       400:
 *         description: Some steps have not been completed
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
 *                   example: "Some steps have not been completed."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
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
 *                   example: "An error occurred while calculating the total lead time."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 error:
 *                   type: string
 *                   example: "Detailed error message"
 */
