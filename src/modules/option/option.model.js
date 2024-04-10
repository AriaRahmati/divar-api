const { Schema, Types, model } = require('mongoose');

const optionSchema = new Schema(
  {
    title: { type: String, index: true, required: true },
    key: { type: String, index: true, required: true },
    type: { type: String, enum: ['number', 'string', 'array', 'boolean'] },
    enum: { type: Array, default: [] },
    guide: { type: String, default: '' },
    category: { type: Types.ObjectId, ref: 'Category', required: true },
  },
  {
    versionKey: false,
  }
);

const optionModel = model('Option', optionSchema);

module.exports = {
  optionModel,
};
