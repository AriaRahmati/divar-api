const { Router } = require('express');
const { AuthRouter } = require('./modules/auth/auth.routes');
const { UserRouter } = require('./modules/user/user.routes');
const { CategoryRouter } = require('./modules/category/category.routes');
const { OptionRouter } = require('./modules/option/option.routes');
const { PostRouter } = require('./modules/post/post.routes');

const MainRouter = Router();

MainRouter.use('/auth', AuthRouter);
MainRouter.use('/user', UserRouter);
MainRouter.use('/category', CategoryRouter);
MainRouter.use('/option', OptionRouter);
MainRouter.use('/post', PostRouter);

MainRouter.get('/', (req, res, next) => {
  res.locals.layouts = 'layouts/website/main';
  res.render('pages/home/index', { posts: [] });
});
MainRouter.get('/panel', (req, res, next) => {
  res.render('pages/panel/dashboard');
});
MainRouter.get('/auth/login', (req, res, next) => {
  res.locals.layouts = 'layouts/auth/main';
  res.render('pages/auth/login');
});

module.exports = MainRouter;
