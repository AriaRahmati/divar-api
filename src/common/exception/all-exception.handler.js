const createHttpError = require('http-errors');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const AllExceptionHandler = (app) => {
  app.use((err, req, res, next) => {
    let status = err?.status ?? err?.statusCode;
    if (!status || isNaN(+status) || status > StatusCodes.NETWORK_AUTHENTICATION_REQUIRED || status < StatusCodes.OK) {
      status = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    res.status(status).json({
      message: err?.message ?? err?.stack ?? ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  });
};

module.exports = AllExceptionHandler;
