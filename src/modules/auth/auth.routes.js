const { Router } = require('express');
const AuthController = require('./auth.controller');
const AuthorizationGuard = require('../../common/middleware/guard/authorization.guard');

const router = Router();

router.post('/send-otp', AuthController.sendOTP);
router.post('/check-otp', AuthController.checkOTP);
router.get('/logout', AuthorizationGuard, AuthController.logout);

module.exports = {
  AuthRouter: router,
};
