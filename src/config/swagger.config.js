const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerConfig = (app) => {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'divar-backend',
        description: 'Divar backend API',
        version: '0.0.1',
      },
    },
    apis: ['src/modules/**/*.swagger.js'],
  });

  const swagger = swaggerUi.setup(swaggerDocument);
  app.use('/docs', swaggerUi.serve, swagger);
};

module.exports = {
  swaggerConfig,
};
