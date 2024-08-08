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
 *       example:
 *         kode_mesin: 5100000499
 *         nama_mesin: JPL CONSOLE FRAUSCHER
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
 *     summary: Create a new machine
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Machine'
 *     responses:
 *       201:
 *         description: The machine was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Machine'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/machines:
 *   get:
 *     summary: Returns the list of all the machines
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the machines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Machine'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/machines/{id}:
 *   get:
 *     summary: Get the machine by id
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine id
 *     responses:
 *       200:
 *         description: The machine description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Machine'
 *       404:
 *         description: The machine was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/machines/{id}:
 *   put:
 *     summary: Update the machine by the id
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Machine'
 *     responses:
 *       200:
 *         description: The machine was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Machine'
 *       404:
 *         description: The machine was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/machines/{id}:
 *   delete:
 *     summary: Remove the machine by id
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The machine id
 *     responses:
 *       200:
 *         description: The machine was deleted
 *       404:
 *         description: The machine was not found
 *       500:
 *         description: Some server error
 */
