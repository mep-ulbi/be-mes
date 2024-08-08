const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MES Production API',
      version: '1.0.0',
      description: 'API Documentation for MES Production System',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: [path.join(__dirname, '../swagger/*.js')],};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
