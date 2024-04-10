const autoBind = require('auto-bind');
const createHttpError = require('http-errors');
const { randomInt } = require('crypto');
const jwt = require('jsonwebtoken');
const { userModel } = require('../user/user.model');
const AuthMessages = require('./auth.messages');

class AuthService {
  constructor() {
    autoBind(this);
  }

  async createUser(mobile, otp = undefined) {
    const newUser = await userModel.create({
      mobile,
      otp,
    });

    return newUser;
  }

  async sendOTP(mobile) {
    const now = Date.now();
    const otp = {
      code: randomInt(100000, 999999).toString(),
      expiresIn: now + 2 * 60 * 1000, // 2 minutes
    };

    const user = await userModel.findOne({ mobile });
    if (!user) {
      const newUser = await this.createUser(mobile, otp);

      return newUser;
    }

    if (user.otp && user.otp.expiresIn > now) {
      throw new createHttpError.BadRequest(AuthMessages.OtpCodeNotExpired);
    }

    user.otp = otp;
    await user.save();

    return user;
  }

  async checkOTP(mobile, code) {
    const user = await this.checkExistByMobile(mobile);

    if (user.otp?.expiresIn < Date.now()) {
      throw new createHttpError.Unauthorized(AuthMessages.OtpCodeExpired);
    }
    if (user.otp?.code !== code) {
      throw new createHttpError.Unauthorized(AuthMessages.OtpCodeNotMatched);
    }

    if (!user.verifiedMobile) {
      user.verifiedMobile = true;
      await user.save();
    }

    const token = this.signToken({ _id: user._id, mobile: user.mobile });

    return token;
  }

  async signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_LIFETIME });
  }

  async checkExistByMobile(mobile) {
    const user = await userModel.findOne({ mobile });
    if (!user) {
      throw new createHttpError.NotFound(AuthMessages.UserNotFound);
    }

    return user;
  }
}

module.exports = new AuthService();
