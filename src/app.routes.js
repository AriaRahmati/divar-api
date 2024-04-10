const { Router } = require('express');
const { AuthRouter } = require('./modules/auth/auth.routes');
const { UserRouter } = require('./modules/user/user.routes');
const { CategoryRouter } = require('./modules/category/category.routes');

const MainRouter = Router();

MainRouter.use('/auth', AuthRouter);
MainRouter.use('/user', UserRouter);
MainRouter.use('/category', CategoryRouter);

module.exports = MainRouter;
