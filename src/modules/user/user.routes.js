const { Router } = require('express');
const UserController = require('./user.controller');
const AuthorizationGuard = require('../../common/middleware/guard/authorization.guard');

const router = Router();

router.get('/whoami', AuthorizationGuard, UserController.whoami);

module.exports = {
  UserRouter: router,
};
