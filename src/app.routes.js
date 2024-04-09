const { Router } = require('express');
const { AuthRouter } = require('./modules/auth/auth.routes');
const { UserRouter } = require('./modules/user/user.routes');

const MainRouter = Router();

MainRouter.use('/auth', AuthRouter);
MainRouter.use('/user', UserRouter);

module.exports = MainRouter;
