const { Schema, Types, model } = require('mongoose');

const postSchema = new Schema({
  title: { type: String, index: true, required: true },
  content: { type: String, required: true },
  category: { type: Types.ObjectId, ref: 'Category', required: true },
  province: { type: String, index: true, required: true },
  city: { type: String, index: true, required: true },
  district: { type: String, index: true, required: true },
  coordination: { type: [Number], index: '2dsphere', required: true },
  images: { type: [String], required: false, default: [] },
});

const postModel = model('Post', postSchema);

module.exports = {
  postModel,
};
