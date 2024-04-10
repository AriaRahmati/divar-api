const { Schema, Types, model } = require('mongoose');

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, index: true, required: true },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: 'Category', required: false },
    parents: { type: [Types.ObjectId], ref: 'Category', required: false, default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
    toJSON: { virtuals: true },
  }
);

categorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent',
});

const categoryModel = model('Category', categorySchema);

module.exports = {
  categoryModel,
};
