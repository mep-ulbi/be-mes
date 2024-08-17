/**
 * @swagger
 * /api/operations/productions/{productionId}/steps/{stepId}/start:
 *   put:
 *     summary: Start a production step
 *     tags: [ProductionSteps]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Starting the initial phase of production"
 *     responses:
 *       200:
 *         description: Production step started
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
 *                   example: "Production step started."
 *                 data:
 *                   $ref: '#/components/schemas/ProductionStep'
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
 *                   example: "Production step not found."
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
 * /api/operations/productions/{productionId}/steps/{stepId}/hold:
 *   put:
 *     summary: Hold a production step
 *     tags: [ProductionSteps]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Starting the initial phase of production"
 *     responses:
 *       200:
 *         description: Production step held
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
 *                   example: "Production step held."
 *                 data:
 *                   $ref: '#/components/schemas/ProductionStep'
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
 *                   example: "Production step not found."
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
 * /api/operations/productions/{productionId}/steps/{stepId}/continue:
 *   put:
 *     summary: Continue a production step
 *     tags: [ProductionSteps]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Starting the initial phase of production"
 *     responses:
 *       200:
 *         description: Production step resumed
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
 *                   example: "Production step resumed."
 *                 data:
 *                   $ref: '#/components/schemas/ProductionStep'
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
 *                   example: "Production step not found."
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
 * /api/operations/productions/{productionId}/steps/{stepId}/end:
 *   put:
 *     summary: End a production step
 *     tags: [ProductionSteps]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Starting the initial phase of production"
 *     responses:
 *       200:
 *         description: Production step ended and lead time calculated
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
 *                   example: "Production step ended and lead time calculated."
 *                 data:
 *                   $ref: '#/components/schemas/ProductionStep'
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
 *                   example: "Production step not found."
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
 * /api/operations/productions/{productionId}/total-lead-time:
 *   get:
 *     summary: Calculate the total lead time for a specific production
 *     tags: [Production]
 *     security:
 *       - bearerAuth: []
 *     description: Calculate the total lead time for all steps in a production.
 *     parameters:
 *       - in: path
 *         name: productionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The production ID
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
