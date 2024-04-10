const { Schema, Types, model } = require('mongoose');

const categorySchema = new Schema(
  {
    name: { type: String, index: true, required: true },
    slug: { type: String, index: true, required: true },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: 'Category', index: true, required: false },
    parents: { type: [Types.ObjectId], ref: 'Category', required: false, default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
    toJSON: { virtuals: true },
  }
);

categorySchema.index({ parent: 1, name: 1 });

categorySchema.virtual('children', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parent',
});

function autoPopulate(next) {
  this.populate([{ path: 'children' }]);
  next();
}
categorySchema.pre('find', autoPopulate).pre('findOne', autoPopulate);

const categoryModel = model('Category', categorySchema);

module.exports = {
  categoryModel,
};
