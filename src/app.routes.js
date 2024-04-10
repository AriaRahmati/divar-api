const { Router } = require('express');
const { AuthRouter } = require('./modules/auth/auth.routes');
const { UserRouter } = require('./modules/user/user.routes');
const { CategoryRouter } = require('./modules/category/category.routes');
const { OptionRouter } = require('./modules/option/option.routes');

const MainRouter = Router();

MainRouter.use('/auth', AuthRouter);
MainRouter.use('/user', UserRouter);
MainRouter.use('/category', CategoryRouter);
MainRouter.use('/option', OptionRouter);

module.exports = MainRouter;
