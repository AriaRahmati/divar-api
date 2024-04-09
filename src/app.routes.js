const { Router } = require('express');
const { AuthRouter } = require('./modules/auth/auth.routes');

const MainRouter = Router();

MainRouter.use('/auth', AuthRouter);

module.exports = MainRouter;
