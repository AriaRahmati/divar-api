const autoBind = require('auto-bind');
const createHttpError = require('http-errors');
const { optionModel } = require('./option.model');
const { categoryModel } = require('../category/category.model');
const OptionMessages = require('./option.messages');
const { isValidObjectId, Types } = require('mongoose');
const slugify = require('slugify');
const { checkExistById } = require('../category/category.service');

class OptionService {
  constructor() {
    autoBind(this);
  }

  async getAll() {
    const options = optionModel
      .find({}, { __v: false }, { _id: -1 })
      .populate([{ path: 'category', select: { name: true, slug: true } }]);

    return options;
  }

  async findById(_id) {
    const option = await optionModel
      .findById(_id, { __v: false }, { _id: -1 })
      .populate([{ path: 'category', select: { name: true, slug: true } }]);

    return option;
  }

  async findByCategoryId(_id) {
    const option = await optionModel
      .findOne({ category: _id }, { __v: false }, { _id: -1 })
      .populate([{ path: 'category', select: { name: true, slug: true } }]);

    return option;
  }

  async findByCategorySlug(slug) {
    const option = await optionModel.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $addFields: {
          categorySlug: '$category.slug',
          categoryName: '$category.name',
          categoryIcon: '$category.icon',
        },
      },
      {
        $project: {
          category: 0,
          __v: 0,
        },
      },
      {
        $match: {
          categorySlug: slug,
        },
      },
    ]);

    return option;
  }

  async create(createOptionDto) {
    if (createOptionDto?.category) {
      if (!isValidObjectId(createOptionDto.category)) {
        throw new createHttpError.BadRequest(OptionMessages.CategoryIdNotValid);
      }

      const category = await this.checkCategoryExistById(createOptionDto.category);
      createOptionDto.category = category._id;
    }

    createOptionDto.key = slugify(createOptionDto.key, { lower: true, trim: true, replacement: '_' });
    await this.checkKeyInOptionsCategoryExist(createOptionDto.category, createOptionDto.key);

    if (createOptionDto.enum && typeof createOptionDto.enum === 'string') {
      createOptionDto.enum = createOptionDto.enum.split(',');
    } else if (Array.isArray(createOptionDto.enum)) {
      createOptionDto.enum = [];
    }

    const newOption = await optionModel.create(createOptionDto);
  }

  async checkExistById(_id) {
    const option = await optionModel.findById(_id);
    if (!option) {
      throw new createHttpError.NotFound(OptionMessages.NotFound);
    }

    return option;
  }

  async checkExistByCategoryId(_id) {
    const option = await optionModel.findOne({ category: _id });
    if (!option) {
      throw new createHttpError.NotFound(OptionMessages.NotFound);
    }

    return option;
  }

  async checkKeyInOptionsCategoryExist(categoryId, key) {
    const option = await optionModel.findOne({ category: categoryId, key });
    if (option) {
      throw new createHttpError.Conflict(OptionMessages.KeyConflict);
    }

    return null;
  }
}

module.exports = new OptionService();
