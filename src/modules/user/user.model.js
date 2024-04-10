const { Schema, model } = require('mongoose');

const OTPSchema = new Schema({
  code: { type: String, default: undefined },
  expiresIn: { type: Number, default: 0 },
});

const userSchema = new Schema(
  {
    fullName: { type: String },
    mobile: { type: String, index: true, unique: true, required: true },
    otp: { type: OTPSchema },
    verifiedMobile: { type: Boolean, index: true, default: false, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = model('User', userSchema);

module.exports = {
  userModel,
};
