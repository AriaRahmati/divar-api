const autoBind = require('auto-bind');
const AuthService = require('./auth.service');
const AuthMessages = require('./auth.messages');
const NodeEnv = require('../../common/constant/env.enum');

class AuthController {
  #service;
  constructor() {
    autoBind(this);

    this.#service = AuthService;
  }
  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;

      const result = await this.#service.sendOTP(mobile);

      return res.json({
        message: AuthMessages.SendOtpSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;

      const token = await this.#service.checkOTP(mobile, code);
      return res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === NodeEnv.PRODUCTION, // secure cookie equals true in production
          sameSite: true,
        })
        .status(200)
        .json({
          message: AuthMessages.LoggedInSuccessfully,
        });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
