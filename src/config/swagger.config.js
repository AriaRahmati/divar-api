const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerConfig = (app) => {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      info: {
        title: 'divar-backend',
        description: 'Divar backend API',
        version: '0.0.1',
      },
    },
    apis: [],
  });

  const swagger = swaggerUi.setup(swaggerDocument);
  app.use('/', swaggerUi.serve, swagger);
};

module.exports = {
  swaggerConfig,
};
