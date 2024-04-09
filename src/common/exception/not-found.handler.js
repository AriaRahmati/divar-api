const createHttpError = require('http-errors');

const NotFoundHandler = (app) => {
  app.use((req, res, next) => {
    const error = new createHttpError.NotFound('Route Not Found');

    next(error);
  });
};

module.exports = NotFoundHandler;
