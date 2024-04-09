const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const AuthorizationMessages = require('../../messages/auth.messages');
const { userModel } = require('../../../modules/user/user.model');

const AuthorizationGuard = async (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;
    if (!token) {
      throw new createHttpError.Unauthorized(AuthorizationMessages.UnAuthorized);
    }

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (data?.id) {
      const user = await userModel.findById(data.id, { otp: 0, verifiedMobile: 0, updatedAt: 0, __v: 0 }).lean();
      if (!user) {
        throw new createHttpError.NotFound(AuthorizationMessages.UserNotFound);
      }

      req.user = user;
      return next();
    }

    throw new createHttpError.Unauthorized(AuthorizationMessages.InvalidToken);
  } catch (error) {
    next(error);
  }
};

module.exports = AuthorizationGuard;
