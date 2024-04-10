const autoBind = require('auto-bind');
const CategoryService = require('./category.service');
const CategoryMessages = require('./category.messages');
const { StatusCodes } = require('http-status-codes');

class CategoryController {
  #service;
  constructor() {
    autoBind(this);

    this.#service = CategoryService;
  }

  async getAll(req, res, next) {
    try {
      const categories = await this.#service.getAll();

      return res.status(StatusCodes.OK).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { name, icon, slug, parent } = req.body;

      const category = await this.#service.create({ name, icon, slug, parent });

      return res.status(StatusCodes.CREATED).json({
        message: CategoryMessages.Created,
        category,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
