/**
 * @swagger
 * tags:
 *   name: ProductionOperations
 *   description: Management of production operations
 */

/**
 * @swagger
 * /api/operations/start:
 *   post:
 *     summary: Start a production operation
 *     tags: [ProductionOperations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - operator_name
 *               - bagian
 *               - production_id
 *               - machine_id
 *             properties:
 *               operator_name:
 *                 type: string
 *               bagian:
 *                 type: string
 *               production_id:
 *                 type: integer
 *               machine_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Operation started successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/operations/{id}/hold:
 *   patch:
 *     summary: Hold a production operation
 *     tags: [ProductionOperations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Operation held successfully
 *       404:
 *         description: Operation not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/operations/{id}/resume:
 *   patch:
 *     summary: Resume a production operation
 *     tags: [ProductionOperations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Operation resumed successfully
 *       404:
 *         description: Operation not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/operations/{id}/end:
 *   patch:
 *     summary: End a production operation
 *     tags: [ProductionOperations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Operation ended successfully
 *       404:
 *         description: Operation not found
 *       500:
 *         description: Server error
 */
