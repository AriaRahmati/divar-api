const autoBind = require('auto-bind');
const createHttpError = require('http-errors');
const { optionModel } = require('./option.model');
const OptionMessages = require('./option.messages');
const { isValidObjectId } = require('mongoose');
const slugify = require('slugify');
const categoryService = require('../category/category.service');
const { isTrue, isFalse } = require('../../common/utils/functions');

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

      const category = await categoryService.checkExistById(createOptionDto.category);
      createOptionDto.category = category._id;
    }

    createOptionDto.key = slugify(createOptionDto.key, { lower: true, trim: true, replacement: '_' });
    await this.checkKeyInOptionsCategoryExist(createOptionDto.category, createOptionDto.key);

    if (createOptionDto.enum && typeof createOptionDto.enum === 'string') {
      createOptionDto.enum = createOptionDto.enum.split(',');
    } else if (!Array.isArray(createOptionDto.enum)) {
      createOptionDto.enum = [];
    }

    if (isTrue(createOptionDto.required)) {
      createOptionDto.required = true;
    } else if (isFalse(createOptionDto.required)) {
      createOptionDto.required = false;
    }

    const newOption = await optionModel.create(createOptionDto);

    return newOption;
  }

  async update(id, updateOptionDto) {
    if (updateOptionDto?.category) {
      if (!isValidObjectId(updateOptionDto.category)) {
        throw new createHttpError.BadRequest(OptionMessages.CategoryIdNotValid);
      }

      const category = await categoryService.checkExistById(updateOptionDto.category);
      updateOptionDto.category = category._id;
    } else {
      delete updateOptionDto.category;
    }

    updateOptionDto.key = slugify(updateOptionDto.key, { lower: true, trim: true, replacement: '_' });
    await this.checkKeyInOptionsCategoryExist(updateOptionDto.category, updateOptionDto.key);

    if (updateOptionDto.enum && typeof updateOptionDto.enum === 'string') {
      updateOptionDto.enum = updateOptionDto.enum.split(',');
    } else if (!Array.isArray(updateOptionDto.enum)) {
      delete updateOptionDto.enum;
    }

    if (isTrue(updateOptionDto.required)) {
      updateOptionDto.required = true;
    } else if (isFalse(updateOptionDto.required)) {
      updateOptionDto.required = false;
    } else {
      delete updateOptionDto.required;
    }

    const updatedOption = await optionModel.findByIdAndUpdate(id, { $set: updateOptionDto });

    return updatedOption;
  }

  async deleteById(_id) {
    const option = await this.checkExistById(_id);

    return await option.deleteOne();
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
