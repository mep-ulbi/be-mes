/**
 * @swagger
 * tags:
 *   name: MachineOperations
 *   description: Management of machine operations
 */

/**
 * @swagger
 * /api/machineoperations/start:
 *   post:
 *     summary: Start a machine operation
 *     tags: [MachineOperations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - operator_name
 *               - bagian
 *               - machine_id
 *             properties:
 *               operator_name:
 *                 type: string
 *               bagian:
 *                 type: string
 *               machine_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Machine operation started successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/machineoperations/{id}/hold:
 *   patch:
 *     summary: Hold a machine operation
 *     tags: [MachineOperations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Machine operation held successfully
 *       404:
 *         description: Machine operation not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/machineoperations/{id}/resume:
 *   patch:
 *     summary: Resume a machine operation
 *     tags: [MachineOperations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Machine operation resumed successfully
 *       404:
 *         description: Machine operation not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/machineoperations/{id}/end:
 *   patch:
 *     summary: End a machine operation
 *     tags: [MachineOperations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Machine operation ended successfully
 *       404:
 *         description: Machine operation not found
 *       500:
 *         description: Server error
 */
