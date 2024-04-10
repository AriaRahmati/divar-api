const autoBind = require('auto-bind');
const OptionService = require('./option.service');
const OptionMessages = require('./option.messages');
const { StatusCodes } = require('http-status-codes');

class OptionController {
  #service;
  constructor() {
    autoBind(this);

    this.#service = OptionService;
  }

  async getAll(req, res, next) {
    try {
      const options = await this.#service.getAll();

      res.status(StatusCodes.OK).json(options);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const option = await this.#service.findById(id);

      return res.status(StatusCodes.OK).json(option);
    } catch (error) {
      next(error);
    }
  }

  async findByCategoryId(req, res, next) {
    try {
      const { categoryId } = req.params;
      const option = await this.#service.findByCategoryId(categoryId);

      return res.status(StatusCodes.OK).json(option);
    } catch (error) {
      next(error);
    }
  }

  async findByCategorySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const option = await this.#service.findByCategorySlug(slug);

      return res.status(StatusCodes.OK).json(option);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { title, key, guide, enum: enumValue, type, category } = req.body;
      await this.#service.create({ title, key, guide, enum: enumValue, type, category });

      return res.status(StatusCodes.CREATED).send({ message: OptionMessages.Created });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OptionController();
