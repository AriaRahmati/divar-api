const { Schema, model } = require('mongoose');

const OTPSchema = new Schema({
  code: { type: String, default: undefined },
  expiresIn: { type: Number, default: 0 },
});

const userSchema = new Schema(
  {
    fullName: { type: String },
    mobile: { type: String, unique: true, required: true },
    otp: { type: OTPSchema },
    verifiedMobile: { type: Boolean, default: false, required: true },
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
