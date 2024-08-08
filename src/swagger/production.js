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
 *     summary: Create a new production
 *     tags: [Productions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Production'
 *     responses:
 *       201:
 *         description: The production was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Production'
 *       500:
 *         description: Some server error
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
 *     summary: Update the production by the id
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Production'
 *     responses:
 *       200:
 *         description: The production was updated
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
 *   delete:
 *     summary: Remove the production by id
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
 *         description: The production was deleted
 *       404:
 *         description: The production was not found
 *       500:
 *         description: Some server error
 */
