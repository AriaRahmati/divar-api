const autoBind = require('auto-bind');
const createHttpError = require('http-errors');
const { categoryModel } = require('./category.model');
const CategoryMessages = require('./category.messages');
const { isValidObjectId, Types } = require('mongoose');
const slugify = require('slugify');

class CategoryService {
  constructor() {
    autoBind(this);
  }

  async getAll() {
    const categories = await categoryModel.find({ parent: { $exists: false } }).populate([{ path: 'children' }]);

    return categories;
  }

  async create(createCategoryDto) {
    if (createCategoryDto?.parent) {
      if (!isValidObjectId(createCategoryDto.parent)) {
        throw createHttpError.BadRequest(CategoryMessages.ParentIdNotValid);
      }

      const parent = await this.checkExistById(createCategoryDto.parent);
      createCategoryDto.parent = parent._id;
      createCategoryDto.parents = [
        ...new Set(
          [parent._id.toString()]
            .concat(parent.parents.map((_id) => _id.toString()))
            .map((_id) => new Types.ObjectId(_id))
        ),
      ];
    }

    if (createCategoryDto?.slug) {
      createCategoryDto.slug = slugify(createCategoryDto.slug, { lower: true, trim: true });
      await this.alreadyExistSlug(createCategoryDto.slug);
    } else {
      createCategoryDto.slug = slugify(createCategoryDto.name, { lower: true, trim: true });
    }

    const newCategory = await categoryModel.create(createCategoryDto);

    return newCategory;
  }

  async checkExistById(_id) {
    const category = await categoryModel.findById(_id);
    if (!category) {
      throw new createHttpError.NotFound(CategoryMessages.NotFound);
    }

    return category;
  }

  async checkExistBySlug(slug) {
    const category = await categoryModel.findOne({ slug });
    if (!category) {
      throw new createHttpError.NotFound(CategoryMessages.NotFound);
    }

    return category;
  }

  async alreadyExistSlug(slug) {
    const category = await categoryModel.findOne({ slug });
    if (category) {
      throw new createHttpError.Conflict(CategoryMessages.SlugConflict);
    }

    return null;
  }
}

module.exports = new CategoryService();
